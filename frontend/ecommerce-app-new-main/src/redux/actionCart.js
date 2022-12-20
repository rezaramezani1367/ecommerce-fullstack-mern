import Swal from "sweetalert2";
import { cartLoading, cartSuccess, cartError } from "./constants";

export const Toast = Swal.mixin({
  toast: true,
  position: "bottom-start",
  showConfirmButton: false,
  timer: 2000,

  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const addToCart = (item) => (dispatch, getState) => {
  dispatch({
    type: cartLoading,
    payload: { ...getState().cart, cartLoading: true },
  });
  try {
    const { cartData } = getState().cart;
    const currentDataCart = cartData.filter((itm) => itm._id == item._id);
    if (currentDataCart.length) {
      const help = cartData.map((itm) => {
        if (itm._id == item._id) {
          if (itm.quantity == itm.countInStock) {
            Toast.fire({
              icon: "error",
              title: `${item.name}  is max count in Stack`,
            });
            return itm;
          } else {
            return { ...itm, quantity: itm.quantity + 1 };
          }
        } else {
          return itm;
        }
      });
      dispatch({
        type: cartSuccess,
        payload: {
          cartData: [...help],
          cartLoading: false,
          cartError: "",
        },
      });
      localStorage.setItem("cart", JSON.stringify(help));
    } else {
      cartData.push({ ...item, quantity: 1 });
      dispatch({
        type: cartSuccess,
        payload: {
          cartData: [...cartData],
          cartLoading: false,
          cartError: "",
        },
      });
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  } catch (error) {
    dispatch({
      type: cartError,
      payload: { cartLoading: false, cartData: [], cartError: error.message },
    });
  }
};
export const minusFromCart = (item) => (dispatch, getState) => {
  dispatch({
    type: cartLoading,
    payload: { ...getState().cart, cartLoading: true },
  });
  try {
    const { cartData } = getState().cart;
    const currentDataCart = cartData.filter((itm) => itm._id == item._id);
    if (currentDataCart.length && currentDataCart[0].quantity > 1) {
      const help = cartData.map((itm) => {
        if (itm._id == item._id) {
          return { ...itm, quantity: itm.quantity - 1 };
        } else {
          return itm;
        }
      });
      dispatch({
        type: cartSuccess,
        payload: {
          cartData: [...help],
          cartLoading: false,
          cartError: "",
        },
      });
      localStorage.setItem("cart", JSON.stringify(help));
    } else {
      let help = cartData.filter((itm) => itm._id !== item._id);
      dispatch({
        type: cartSuccess,
        payload: {
          cartData: [...help],
          cartLoading: false,
          cartError: "",
        },
      });
      Toast.fire({
        icon: "error",
        title: `${item.name}  deleted from cart successfully`,
      });
      cartData.length
        ? localStorage.setItem("cart", JSON.stringify(cartData))
        : localStorage.removeItem("cart");
    }
  } catch (error) {
    dispatch({
      type: cartError,
      payload: { cartLoading: false, cartData: [], cartError: error.message },
    });
  }
};
export const removeItmeCart = (index) => (dispatch, getState) => {
  dispatch({
    type: cartLoading,
    payload: { ...getState().cart, cartLoading: true },
  });
  try {
    const {
      cart: { cartData },
    } = getState();
    Toast.fire({
      icon: "error",
      title: `${cartData[index].name}  deleted from cart successfully`,
    });
    cartData.splice(index, 1);
    cartData.length
      ? localStorage.setItem("cart", JSON.stringify(cartData))
      : localStorage.removeItem("cart");
    dispatch({
      type: cartSuccess,
      payload: {
        cartData: [...cartData],
        cartLoading: false,
        cartError: "",
      },
    });
  } catch (error) {
    dispatch({
      type: cartError,
      payload: { cartLoading: false, cartData: [], cartError: error.message },
    });
  }
};
