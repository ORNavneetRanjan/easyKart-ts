import { useCallback, useEffect, useMemo, useState, ReactNode } from "react";
import { CartContext } from "../Context";
import {
  getCart,
  getProductData,
  getProductsByIds,
  saveCart,
} from "../API/app";
import { withUser } from "../withProvider";
import { Product } from "../Models";

type CartProviderProps = {
  isLoggedIn: boolean;
  children: ReactNode;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

type QuantityMap = Record<string, number>;

function CartProvider({ isLoggedIn, children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdated, setUpdate] = useState(false);
  const [quantityMap, setQuantityMap] = useState<QuantityMap>({});
  console.log("cart is ", cart);
  console.log("quantity map is", quantityMap);
  useEffect(() => {
    if (!isLoggedIn) {
      const savedDataString = localStorage.getItem("my-cart") || "{}";
      const savedData: QuantityMap = JSON.parse(savedDataString);
      getProductsByIds(Object.keys(savedData)).then((products) => {
        const savedCart = products.map((p) => ({
          product: p,
          quantity: savedData[p.id],
        }));
        setCart(savedCart);
        setQuantityMap(savedData);
        setLoading(false);
      });
    } else {
      getCart().then((response: any) => {
        setCart(response);
        setQuantityMap(cartToQuantityMap(response));
        setLoading(false);
      });
    }
  }, [isLoggedIn]);

  const updateCart = useCallback(
    (updatedQuantityMap: QuantityMap) => {
      if (!isLoggedIn) {
        localStorage.setItem("my-cart", JSON.stringify(updatedQuantityMap));
      } else {
        saveCart(updatedQuantityMap);
      }
      setUpdate(false);
      quantityMapToCart(updatedQuantityMap).then((updatedCart) => {
        setCart(updatedCart);
      });
    },
    [isLoggedIn]
  );

  const cartToQuantityMap = (cart: CartItem[]): QuantityMap =>
    cart.reduce(
      (m, cartItem) => ({
        ...m,
        [cartItem.product.id]: cartItem.quantity,
      }),
      {}
    );

  const quantityMapToCart = useCallback(
    (map: QuantityMap): Promise<CartItem[]> => {
      return getProductsByIds(Object.keys(map)).then((products) => {
        return products.map((p) => ({
          product: p,
          quantity: map[p.id],
        }));
      });
    },
    []
  );

  const addToCart = useCallback(
    (productID: number, count: number) => {
      getProductData(productID).then((response) => {
        setCart((prevCart) => [
          ...prevCart,
          { product: response, quantity: count },
        ]);
        setQuantityMap({ ...quantityMap, [productID]: count });
        updateCart({ ...quantityMap, [productID]: count });
      });
    },
    [quantityMap, updateCart]
  );

  const deleteItems = useCallback(
    (id: number) => {
      const newCart = cart.filter((item) => item.product.id !== id); // Remove the item by product ID
      const newQuantityMap = { ...quantityMap };
      delete newQuantityMap[id];
      setQuantityMap(newQuantityMap);
      setCart(newCart); // Update the cart with the filtered items
      updateCart(newQuantityMap); // Update quantityMap in localStorage or backend
    },
    [cart, quantityMap, updateCart]
  );

  const handleChange = useCallback((productId: string, newValue: number) => {
    setQuantityMap((prevQuantityMap) => {
      const newQuantityMap = { ...prevQuantityMap, [productId]: newValue };
      setUpdate(true);
      return newQuantityMap;
    });
  }, []);

  const totalOrder = useMemo(() => {
    if (!Array.isArray(cart) || cart.length === 0) {
      return "0.00";
    }
    return cart
      .reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0)
      .toFixed(2);
  }, [cart]);

  const totalCount = useMemo(() => {
    if (!Array.isArray(cart) || cart.length === 0) {
      return 0;
    }
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteItems,
        updateCart,
        totalOrder,
        totalCount,
        quantityMap,
        setQuantityMap,
        handleChange,
        isUpdated,
        setUpdate,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default withUser(CartProvider);
