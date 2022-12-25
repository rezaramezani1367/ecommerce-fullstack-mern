import { Box, Container } from "@mui/system";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import ChangeProfile from "./components/ChangeProfile";
import ChangePassword from "./components/ChangePassword";
import UploadAvatar from "./components/UploadAvatar";
import ShippingAddress from "./components/ShippingAddress";
import Checkout from "./components/Checkout";
import Order from "./components/Order";
import Orders from "./components/Orders";
import NotFound from "./components/NotFound";
import FilterProduct from "./components/FilterProduct";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

const RouterSection = () => {
  return (
    <Container className="py-4">
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          <Route path="/">
            <Route index element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/change" element={<ChangeProfile />} />
            <Route path="/profile/password" element={<ChangePassword />} />
            <Route path="/profile/avatar" element={<UploadAvatar />} />
            <Route path="/address" element={<ShippingAddress />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/filter" element={<FilterProduct />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </QueryParamProvider>
    </Container>
  );
};

export default RouterSection;
