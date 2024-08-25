import { createContext } from "react";
import { AlertType } from "./Components/Alert";
import { CartItem } from "./Provider/CartProvider";
import { UserContextType } from "./Provider/UserProvider";

export interface AlertContextType {
  alert: AlertType | undefined;
  setAlert: (alert: AlertType) => void;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (productID: number, count: number) => void;
  deleteItems: (id: string) => void;
  updateCart: (updatedQuantityMap: Record<string, number>) => void;
  totalOrder: string;
  totalCount: number;
  quantityMap: Record<string, number>;
  setQuantityMap: (map: Record<string, number>) => void;
  handleChange: (productId: string, newValue: number) => void;
  isUpdated: boolean;
  setUpdate: (updated: boolean) => void;
  loading: boolean;
}

// Create contexts with the defined types
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
