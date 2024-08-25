import React from "react";
import SingleItem from "./SingleItem";
import { withCart } from "../withProvider";
import { CartItem } from "../Provider/CartProvider"; // Import CartItem if it's defined

// Define the type for CartList props
interface CartListProps {
  cart: CartItem[]; // Adjust this type according to your CartItem definition
}

const CartList: React.FC<CartListProps> = ({ cart }) => {
  return (
    <>
      {cart.map((item) => (
        <SingleItem
          key={item.product.id} // Make sure `id` exists on `product`
          link={item.product.thumbnail} // Adjust if `thumbnail` is not the correct property
          title={item.product.title}
          price={item.product.price}
          quantity={item.quantity}
          id={item.product.id}
        />
      ))}
    </>
  );
};

export default withCart(CartList);
