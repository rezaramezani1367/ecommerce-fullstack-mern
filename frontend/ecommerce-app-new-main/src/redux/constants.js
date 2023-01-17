import axios from "axios";

const productLoading = "productLoading";
const productSuccess = "productSuccess";
const productError = "productError";
const cartLoading = "cartLoading";
const cartSuccess = "cartSuccess";
const cartError = "cartError";
const userLoading = "userLoading";
const userSuccess = "userSuccess";
const userError = "userError";
const orderLoading = "orderLoading";
const orderSuccess = "orderSuccess";
const orderError = "orderError";
const baseUrl = "https://ecommerce-test-6rfi.onrender.com/";
const client = axios.create({
  baseURL: baseUrl,
});


export {
  baseUrl,
  productLoading,
  productSuccess,
  productError,
  cartLoading,
  cartSuccess,
  cartError,
  userLoading,
  userSuccess,
  userError,
  orderLoading,
  orderSuccess,
  orderError,
  client
};
