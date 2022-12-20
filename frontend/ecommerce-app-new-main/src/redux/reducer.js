import {
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
} from "./constants";

export const products = (
  state = {
    productLoading: false,
    productData: [],
    productError: "",
    paginationData: [],
  },
  { type, payload }
) => {
  switch (type) {
    case productLoading:
      return payload;
    case productSuccess:
      return payload;
    case productError:
      return payload;

    default:
      return state;
  }
};
export const cart = (
  state = { cartLoading: false, cartData: [], cartError: "" },
  { type, payload }
) => {
  switch (type) {
    case cartLoading:
      return payload;
    case cartSuccess:
      return payload;
    case cartError:
      return payload;

    default:
      return state;
  }
};
export const user = (
  state = { userLoading: false, userData: {}, userError: "" },
  { type, payload }
) => {
  switch (type) {
    case userLoading:
      return payload;
    case userSuccess:
      return payload;
    case userError:
      return payload;

    default:
      return state;
  }
};
export const order = (
  state = { orderLoading: false, orderData: [], orderError: "" },
  { type, payload }
) => {
  switch (type) {
    case orderLoading:
      return payload;
    case orderSuccess:
      return payload;
    case orderError:
      return payload;

    default:
      return state;
  }
};
