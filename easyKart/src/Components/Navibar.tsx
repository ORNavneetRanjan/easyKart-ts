import { FC } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { withCart } from "../withProvider";

type props = {
  totalCount: number;
};

const Navibar: FC<props> = ({ totalCount }) => {
  return (
    <>
      <div className="shadow-md">
        <div className="max-w-screen-lg bg-white flex items-center justify-between  m-auto">
          <Link to="/">
            <img
              className="h-full w-40 object-cover"
              src="https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo-640x400.png"
              alt="app logo"
            />
          </Link>
          <span className="flex gap-5">
            <Link to="/profile">
              <CgProfile className="text-5xl font-thin opacity-80" />
            </Link>
            <Link to="/cart" className="relative">
              <img
                className="w-20 h-12 object-scale-down rounded-full"
                src="https://t3.ftcdn.net/jpg/03/14/85/06/360_F_314850659_2aQLerz30kWj78tqpaGSbzYD6sAUmuDf.jpg"
                alt="second logo"
              />
              <p className="absolute right-0 top-0 text-white bg-sky-500 p-1 rounded-full">
                {totalCount}
              </p>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default withCart(Navibar);
