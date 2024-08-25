import { FC } from "react";
import { withCart, withUser } from "../withProvider";
import { User } from "../Provider/UserProvider";
// Assume you have a UserProps type defined somewhere

interface ProfileProps {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  updateCart: (cart: string) => void;
}

const Profile: FC<ProfileProps> = ({ user, setUser, updateCart }) => {
  function handleClick() {
    localStorage.removeItem("token");
    localStorage.removeItem("my-cart");
    updateCart("");
    setUser(undefined);
  }

  return (
    <div className="grow bg-gray-200 flex p-10">
      <div className="bg-sky-500 grow max-w-screen-lg m-auto h-svh flex flex-col gap-10 justify-center p-10 items-start lg:items-center">
        <div className="flex flex-col gap-5">
          <span>
            <h2 className="text-white text-xl font-sans">Full Name: </h2>
            <p>{user?.full_name}</p>
          </span>
          <span>
            <h2 className="text-white text-xl font-sans">Email: </h2>
            <p>{user?.email}</p>
          </span>
          <span>
            <h2 className="text-white text-xl font-sans">Joined on: </h2>
            <p>{user?.created_at}</p>
          </span>
          <button
            onClick={handleClick}
            className="text-sky-500 h-11 w-56 lg:w-72 p-2 text-2xl rounded-md shadow-md bg-white"
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default withUser(withCart(Profile));
