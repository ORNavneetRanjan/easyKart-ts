import { FaRegCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discount_percentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string;
};

export type User = {
  id: number;
  full_name: string;
  email: string;
  remember_me_token: string | null;
  created_at: string; // Date in ISO format
  updated_at: string; // Date in ISO format
};

export interface AlertType {
  message: string;
  type: keyof typeof themeMap; // 'success' | 'error'
}

export const themeMap = {
  success: {
    color: "bg-green-400",
    Icon: FaRegCheckCircle,
  },
  error: {
    color: "bg-red-400",
    Icon: MdErrorOutline,
  },
};
