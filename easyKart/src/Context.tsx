import { createContext } from "react";
import { AlertType } from "./Models";
import { CartItem } from "./Provider/CartProvider";
import { User } from "./Models";

export type AlertContextType = {
  alert: AlertType | undefined;
  setAlert: (alert: AlertType) => void;
};

export type CartContextType = {
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
};

export interface UserContextType {
  isLoggedIn: boolean;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
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
