import React from "react";
import { Link } from "react-router-dom";

// Define and export the ProductProps type
export type ProductProps = {
  id: number;
  title: string;
  brand: string;
  price: number;
  thumbnail?: string;
  description: string;
};

const Product: React.FC<ProductProps> = ({
  id,
  title,
  brand,
  price,
  thumbnail,
}) => {
  return (
    <div className="bg-white w-52 lg:w-72 p-2 mb-2">
      <img
        className="w-full object-cover"
        src={
          "https://images.pexels.com/photos/27469964/pexels-photo-27469964/free-photo-of-a-woman-is-cutting-a-pink-cake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        alt={thumbnail}
      />
      <h2 className="text-lg text-gray-500">{brand}</h2>
      <p className="text-xl font-medium">{title}</p>
      <p className="text-lg">Price: ${price}</p>
      <Link to={`/product/${id}`} className="text-blue-500">
        View details
      </Link>
    </div>
  );
};

export default Product;
