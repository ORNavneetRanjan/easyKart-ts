import React from "react";
import CartList from "./CartList";
import { withCart } from "../withProvider";
import { ProductProps } from "../Product/Product";

// Define types for the Cart props
interface CartProps {
  cart: { product: ProductProps; quantity: number }[]; // Adjust according to your CartItem type
  updateCart: (quantityMap: Record<string, number>) => void;
  totalOrder: number;
  isUpdated: boolean;
  quantityMap: Record<string, number>;
}

const Cart: React.FC<CartProps> = ({
  cart,
  updateCart,
  totalOrder,
  isUpdated,
  quantityMap,
}) => {
  if (!cart || cart.length === 0) {
    return (
      <div className="grow bg-gray-200 px-10 py-8 lg:px-44 w-screen">
        <div className="bg-white p-10 max-w-screen-lg m-auto">
          <h1 className="text-center text-sky-400 font-sans text-5xl">
            No items in the cart
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 px-10 py-8 lg:px-44 w-screen min-h-screen">
      <div className="bg-white p-10 max-w-screen-lg m-auto">
        <CartList />
        <div className="gap-5 p-3 flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col lg:flex-row gap-2">
            <input
              className="w-60 p-2 border shadow-md text-gray-400 text-xl font-sans"
              type="text"
              placeholder="Coupon code"
            />
            <button className="w-60 text-xl bg-sky-400 text-white text-center p-2 rounded-md">
              APPLY COUPON
            </button>
          </div>
          <button
            className={
              "w-60 text-xl text-white text-center p-2 rounded-md " +
              (isUpdated ? "bg-sky-500 " : "bg-gray-500")
            }
            onClick={() => updateCart(quantityMap)}
            disabled={!isUpdated}
          >
            UPDATE CART
          </button>
        </div>
        <div className="w-full flex flex-row-reverse mt-10">
          <div className="w-2/3 lg:w-1/2 self-end border-1 shadow-md gap-5">
            <h1 className="font-bold bg-gray-400 text-xl p-2">Cart Total</h1>
            <div className="flex flex-col gap-3 p-2">
              <h2>Subtotal = ${totalOrder}</h2>
              <h2>Total = ${totalOrder}</h2>
            </div>
            <button className="w-full text-2xl bg-sky-400 text-white text-center p-2 rounded-md">
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withCart(Cart);
