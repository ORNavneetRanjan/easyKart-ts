import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { getProductList } from "../API/app";
import Loading from "../Components/Loading";
import NotFound from "../Components/NotFound";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Link, useSearchParams } from "react-router-dom";
import { ProductProps } from "./Product"; // Import the ProductProps type

// Define types for the meta state
interface Meta {
  last_page: number;
}

const ItemsDisplay: React.FC = () => {
  const [productList, setProductList] = useState<ProductProps[]>([]); // Use ProductProps[] for productList
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<Meta>({ last_page: 1 });

  let [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  let { query = "", sort = "default", page = 1 } = params;
  page = parseInt(page as string, 10);

  useEffect(() => {
    let sortBy: string | undefined;
    let sortType: string | undefined;
    if (sort === "low") {
      sortBy = "price";
    } else if (sort === "high") {
      sortBy = "price";
      sortType = "desc";
    } else if (sort === "name") {
      sortBy = "title";
    }

    const xyz = getProductList({ sortBy, query, page, sortType });
    xyz
      .then(function (response: any) {
        setProductList(response.data);
        setMeta(response.meta);
        setLoading(false);
      })
      .catch(function () {
        setLoading(false);
      });
  }, [page, query, sort]);

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams({
      ...params,
      query: event.target.value,
      page: page.toString(),
    });
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchParams({
      ...params,
      sort: event.target.value,
      page: page.toString(),
    });
  }

  if (loading) {
    return <Loading />;
  }

  if (!productList || productList.length === 0) {
    return <NotFound />;
  }

  const totalPages = meta.last_page;

  let startPage = Math.max(1, page - 1);
  let endPage = Math.min(totalPages, page + 1);

  if (page === 1) {
    endPage = Math.min(totalPages, 3);
  } else if (page === totalPages) {
    startPage = Math.max(1, totalPages - 2);
  }

  const pagesToDisplay = [];
  for (let i = startPage; i <= endPage; i++) {
    pagesToDisplay.push(i);
  }

  return (
    <div className="bg-gray-200 px-10 py-8 lg:px-44 w-screen min-h-screen">
      <div className="bg-white flex flex-wrap justify-center gap-10 p-10 max-w-screen-lg m-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
          <input
            className="rounded-md border-2 border-solid px-10 py-2 shadow-xl"
            placeholder="Search"
            type="text"
            value={query}
            onChange={handleQueryChange}
          />

          <select
            className="rounded-md border-2 border-solid px-8 py-2 shadow-xl"
            id="settings"
            name="menu"
            onChange={handleSortChange}
            value={sort}
          >
            <option value="default">Default</option>
            <option value="name">Sort by title </option>
            <option value="low">Sort by price: low to high</option>
            <option value="high">Sort by price: high to low</option>
          </select>
        </div>
        {productList.length > 0 && <ProductList data={productList} />}
        {productList.length === 0 && (
          <div className="text-xl lg:text-4xl">No product found</div>
        )}
      </div>

      <div className="bg-white flex max-w-screen-lg m-auto p-5 gap-1">
        {page > 1 && (
          <Link
            to={
              "?" +
              new URLSearchParams({ ...params, page: (page - 1).toString() })
            }
            className="p-2 border-solid border-2 border-orange-500 rounded-md bg-white text-orange-500"
          >
            <GrLinkPrevious />
          </Link>
        )}

        {pagesToDisplay.map((item) => (
          <Link
            key={item}
            to={"?" + new URLSearchParams({ ...params, page: item.toString() })}
            className={`p-2 border-solid border-2 border-orange-500 rounded-md ${
              item === page
                ? "bg-orange-500 text-white"
                : "bg-white text-orange-500"
            }`}
          >
            {item}
          </Link>
        ))}

        {page < totalPages && (
          <Link
            to={
              "?" +
              new URLSearchParams({ ...params, page: (page + 1).toString() })
            }
            className="p-2 border-solid border-2 border-orange-500 rounded-md bg-white text-orange-500"
          >
            <GrLinkNext />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ItemsDisplay;
