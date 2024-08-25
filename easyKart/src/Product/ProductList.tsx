import React from "react";
import Product, { ProductProps } from "./Product";

interface ProductListProps {
  data: ProductProps[]; // Define the data prop type as an array of ProductProps
}

const ProductList: React.FC<ProductListProps> = ({ data }) => {
  return (
    <>
      <div className="py-3 flex flex-wrap items-center justify-center gap-2 lg:gap-5">
        {data.map((product) => (
          <Product
            key={`${product.title} + ${product.description} ${product.price}-${product.id}`}
            thumbnail={product.thumbnail}
            title={product.title}
            description={product.description}
            price={product.price}
            id={product.id}
            brand={product.brand}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
