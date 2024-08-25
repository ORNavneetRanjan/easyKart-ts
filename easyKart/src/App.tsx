import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Navibar from "./Components/Navibar";
import ItemsDisplay from "./Product/ItemsDisplay";
import Footer from "./Components/Footer";
import ProductDisplay from "./Product/ProductDisplay";
import NotFound from "./Components/NotFound";
import Cart from "./CartFolder/Cart";
import Login from "./User/Login";
import SignIn from "./User/SignUp";
import ForgotPass from "./User/ForgotPass";
import AuthRoute from "./Routes/AuthRoute";
import UserRoute from "./Routes/UserRoute";
import Profile from "./User/Profile";
import Alert from "./Components/Alert";
import UserProvider from "./Provider/UserProvider";
import AlertProvider from "./Provider/AlertProvider";
import CartProvider from "./Provider/CartProvider";

const App: FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <UserProvider>
        <CartProvider>
          <AlertProvider>
            <Navibar />
            <div className="grow flex flex-col">
              <Alert />
              <Routes>
                <Route path="/forgot-pass" element={<ForgotPass />} />
                <Route
                  path="/profile"
                  element={
                    <UserRoute>
                      <Profile />
                    </UserRoute>
                  }
                />
                <Route
                  path="/signin"
                  element={
                    <AuthRoute>
                      <SignIn />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <AuthRoute>
                      <Login />
                    </AuthRoute>
                  }
                />
                <Route path="/" element={<ItemsDisplay />} />
                <Route
                  path="/cart"
                  element={
                    <UserRoute>
                      <Cart />
                    </UserRoute>
                  }
                />
                <Route
                  path="/product/:sku"
                  element={
                    <UserRoute>
                      <ProductDisplay />
                    </UserRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </AlertProvider>
        </CartProvider>
      </UserProvider>
    </div>
  );
};

export default App;
