import axios, { AxiosResponse } from "axios";
import { Product } from "../Models";

type CartItem = {
  productId: number;
  quantity: number;
  // Add other fields as necessary
};

// Fetch a single product by ID
export function getProductData(id: number): Promise<Product> {
  return axios
    .get(`https://myeasykart.codeyogi.io/product/${id}`)
    .then((response) => {
      console.log(response);
      return response.data;
    });
}

// Fetch multiple products by an array of IDs
export function getProductsByIds(ids: string[]): Promise<Product[]> {
  const commaSeparatedIds = ids.join();
  return axios
    .get("https://myeasykart.codeyogi.io/products/bulk", {
      params: {
        ids: commaSeparatedIds,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
}

interface GetProductListParams {
  sortBy?: string;
  query?: string;
  page?: number;
  sortType?: string;
}

interface ProductListResponse {
  data: Product[];
  meta: {
    last_page: number;
  };
}

export const getProductList = ({
  sortBy,
  query,
  page,
  sortType,
}: GetProductListParams): Promise<ProductListResponse> => {
  let params: Record<string, string | number> = {};

  if (sortBy) {
    params.sortBy = sortBy;
  }
  if (query) {
    params.search = query;
  }
  if (page) {
    params.page = page;
  }
  if (sortType) {
    params.sortType = sortType;
  }

  return axios
    .get("https://myeasykart.codeyogi.io/products", {
      params,
    })
    .then((response: AxiosResponse<ProductListResponse>) => {
      return response.data;
    });
};

type QuantityMap = Record<string, number>;
// Save the cart data
export function saveCart(cart: QuantityMap): Promise<void> {
  return axios
    .post(
      "https://myeasykart.codeyogi.io/carts",
      { data: cart },
      {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      }
    )
    .then((response) => {
      return response.data;
    });
}

// Get the cart data
export function getCart(): Promise<CartItem[]> {
  return axios
    .get("https://myeasykart.codeyogi.io/carts", {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    })
    .then((response) => {
      return response.data;
    });
}
