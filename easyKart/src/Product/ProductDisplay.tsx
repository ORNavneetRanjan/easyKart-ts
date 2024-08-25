import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { getProductData } from "../API/app";
import Loading from "../Components/Loading";
import { RxTrackPrevious, RxTrackNext } from "react-icons/rx";
import NotFound from "../Components/NotFound";
import { ProductProps } from "./Product";
type ProductDisplayProps = {
  addToCart: (sku: number, quantity: number) => void;
  updateCart: (sku: number, quantity: number) => void;
  quantityMap: Record<number, number>;
};

const ProductDisplay: React.FC<ProductDisplayProps> = ({ addToCart }) => {
  const { sku } = useParams<{ sku: string }>();
  const skuNumber = Number(sku);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setLoading(false);
    getProductData(skuNumber)
      .then((response: any) => {
        setProduct(response);
        setLoading(true);
        setCount(1);
      })
      .catch(() => {
        setLoading(true);
      });
  }, [skuNumber]);

  if (!loading) {
    return <Loading />;
  }
  if (!product) {
    return <NotFound />;
  }

  const handleCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(Number(event.target.value));
  };

  const handleButtonClick = () => {
    addToCart(skuNumber, count);
  };

  return (
    product && (
      <div className="grow bg-gray-200 p-4 md:p-8 justify-center items-center flex flex-col min-w-screen gap-5">
        <Link
          to="/"
          className="bg-sky-500 text-white text-lg md:text-xl lg:text-2xl rounded-md mb-2 ml-4 md:ml-24 p-2 self-start"
        >
          <IoChevronBackSharp />
        </Link>
        <div className="grow bg-white flex flex-col md:flex-row p-4 md:p-5 shadow-xl mx-4 md:mx-14 w-full max-w-4xl">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full md:w-1/2 object-cover"
          />

          <div className="flex flex-col px-2 md:px-8 gap-2 md:gap-5 w-full md:w-1/2 mt-4 md:mt-0">
            <h1 className="text-2xl md:text-4xl font-sans">{product.title}</h1>
            <h2 className="font-bold text-xl md:text-2xl">
              Price: ${product.price}
            </h2>
            <p className="text-gray-500">{product.description}</p>
            <div className="flex gap-2 md:gap-5">
              <input
                className="w-12 shadow-2xl bg-gray-50 border border-gray-300 p-1 md:p-2"
                type="number"
                placeholder="1"
                value={count}
                onChange={handleCount}
              />
              <button
                onClick={handleButtonClick}
                className="bg-red-500 text-white p-1 md:p-2 self-center rounded-lg text-lg md:text-2xl"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-4 lg:px-24 w-full">
          {skuNumber > 1 ? (
            <Link
              to={`/product/${skuNumber - 1}`}
              className="bg-sky-500 text-white text-lg lg:text-2xl rounded-md p-2 lg:p-5"
            >
              <RxTrackPrevious />
            </Link>
          ) : (
            <div className=""></div> // Adjust width as needed
          )}
          {skuNumber < 100 && (
            <Link
              to={`/product/${skuNumber + 1}`}
              className="bg-sky-500 text-white text-lg lg:text-2xl rounded-md p-2 lg:p-5"
            >
              <RxTrackNext />
            </Link>
          )}
        </div>

        <span className="grow"></span>
      </div>
    )
  );
};

export default ProductDisplay;
