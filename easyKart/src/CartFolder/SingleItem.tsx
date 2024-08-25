import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { withCart } from "../withProvider"; // Adjust the path as necessary

// Define the type for SingleItem props
interface SingleItemProps {
  link: string;
  title: string;
  price: number;
  quantity: number;
  id: string;
  deleteItems: (id: string) => void;
  handleChange: (id: string, quantity: number) => void;
  setUpdate: (status: boolean) => void;
}

const SingleItem: React.FC<SingleItemProps> = ({
  link,
  title,
  price,
  quantity,
  id,
  deleteItems,
  handleChange,
  setUpdate,
}) => {
  const [newQuantity, setQuantity] = useState<number>(quantity);

  function handleRemove() {
    deleteItems(id);
  }

  function onHandleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value ? Number(event.target.value) : 0;
    setQuantity(value);
    handleChange(id, value); // Pass both ID and the new value
    setUpdate(true);
  }

  return (
    <>
      <div className="grid grid-row-6 lg:grid-cols-6 items-center justify-center gap-4 p-4">
        <button onClick={handleRemove}>
          <TiDelete className="text-2xl" />
        </button>
        <div className="flex items-center col-span-2">
          <img
            className="w-16 h-16 object-cover"
            src={link} // Use the link prop for the image src
            alt={title}
          />
          <p className="ml-4 text-lg font-medium">{title}</p>
        </div>
        <span>
          <p className="visible lg:invisible">Price</p>
          <p className="text-lg font-bold">${price}</p>
        </span>
        <span>
          <p className="visible lg:invisible">Quantity</p>
          <input
            type="number"
            min={1}
            onChange={onHandleChange}
            value={newQuantity || 1}
            className="p-2 text-lg border shadow-md w-16"
          />
        </span>
        <span>
          <p className="visible lg:invisible">SubTotal</p>
          <p className="text-lg font-bold">${price * newQuantity}</p>
        </span>
      </div>
      <hr />
    </>
  );
};

export default withCart(SingleItem);
