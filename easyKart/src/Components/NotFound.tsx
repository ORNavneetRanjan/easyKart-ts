import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <>
      <div className="bg-sky-100 grow flex flex-col items-center justify-center gap-5">
        <img
          className="w-3/4 lg:w-1/2 h-52 lg:h-1/2 object-cover rounded-lg"
          src="https://as1.ftcdn.net/v2/jpg/07/67/48/12/1000_F_767481285_9nq593kEdZBiVqrc9Kfunymhcv0kk5E2.jpg"
          alt="error page"
        />
        <h1 className="text-4xl text-sky-500 ">Path Not Found</h1>
        <Link
          className="bg-sky-500 text-white boreder rounded-full px-6 py-2"
          to={"/"}
        >
          Go Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
