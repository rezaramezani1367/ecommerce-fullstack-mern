import { Toast } from "./actionCart";
import {
  orderLoading,
  orderSuccess,
  orderError,
  client,
  cartSuccess,
} from "./constants";

export const submitOrder = (values) => async (dispatch, getState) => {
  dispatch({
    type: orderLoading,
    payload: { ...getState().order, orderData: [], orderLoading: true },
  });
  try {
    const { data } = await client.post(
      "/order/submit",
      {
        ...values,
      },
      {
        headers: {
          authorization: `Bearer ${values.token}`,
        },
      }
    );
    dispatch({
      type: orderSuccess,
      payload: {
        orderLoading: false,
        orderData: [data],
        orderError: "",
      },
    });

    dispatch({
      type: cartSuccess,
      payload: {
        cartData: [],
        cartLoading: false,
        cartError: "",
      },
    });
    localStorage.removeItem("cart");
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    dispatch({
      type: orderError,
      payload: {
        ...getState().orders,
        orderLoading: false,
        orderError: errorMessage,
      },
    });
    Toast.fire({
      icon: "error",
      title: errorMessage,
    });
  }
};
export const getOrders =
  ({ token }) =>
  async (dispatch, getState) => {
    dispatch({
      type: orderLoading,
      payload: { ...getState().order, orderData: [], orderLoading: true },
    });
    try {
      const { data } = await client.get(
        "/order",

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: orderSuccess,
        payload: {
          orderLoading: false,
          orderData: [...data],
          orderError: "",
        },
      });
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch({
        type: orderError,
        payload: {
          ...getState().orders,
          orderLoading: false,
          orderError: errorMessage,
        },
      });
      Toast.fire({
        icon: "error",
        title: errorMessage,
      });
    }
  };
export const getOrderDetails =
  ({ token, id }) =>
  async (dispatch, getState) => {
    dispatch({
      type: orderLoading,
      payload: { ...getState().order, orderData: [], orderLoading: true },
    });
    try {
      const { data } = await client.get(
        `/order/${id}`,

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: orderSuccess,
        payload: {
          orderLoading: false,
          orderData: [data],
          orderError: "",
        },
      });
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch({
        type: orderError,
        payload: {
          ...getState().orders,
          orderLoading: false,
          orderError: errorMessage,
        },
      });
      Toast.fire({
        icon: "error",
        title: errorMessage,
      });
    }
  };
