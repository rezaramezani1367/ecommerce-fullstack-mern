import { useNavigate } from "react-router-dom";
import { Toast } from "./actionCart";
import { userLoading, userSuccess, userError, client } from "./constants";

export const createUser = (values) => async (dispatch, getState) => {
  dispatch({
    type: userLoading,
    payload: {
      ...getState().user,
      userData: {
        ...getState().user.userData,
        IsSuccessSignup: false,
      },
      userLoading: true,
    },
  });
  try {
    const data = await client.post("/user/add/", {
      ...values,
    });

    dispatch({
      type: userSuccess,
      payload: {
        userLoading: false,
        userData: { ...data, IsSuccessSignup: true },
        userError: "",
      },
    });
    Toast.fire({
      icon: "success",
      title: `${values.username} created successfully`,
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.error
      : error.message;
    dispatch({
      type: userError,
      payload: {
        ...getState().user,
        userLoading: false,
        userError: errorMessage,
      },
    });
    Toast.fire({
      icon: "error",
      title: errorMessage,
    });
  }
};
export const loginUser = (values) => async (dispatch, getState) => {
  dispatch({
    type: userLoading,
    payload: {
      ...getState().user,
      userData: {
        ...getState().user.userData,
        IsSuccessLogin: false,
      },
      userLoading: true,
    },
  });
  try {
    const { data } = await client.post("/user/login/", { ...values });
    dispatch({
      type: userSuccess,
      payload: {
        userLoading: false,
        userData: { ...data.user, IsSuccessLogin: true },
        userError: "",
      },
    });
    localStorage.setItem("user", JSON.stringify(data.user));
    Toast.fire({
      icon: "success",
      title: `${values.username} logged in successfully`,
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.error
      : error.message;
    dispatch({
      type: userError,
      payload: {
        ...getState().user,
        userLoading: false,
        userError: errorMessage,
      },
    });
    Toast.fire({
      icon: "error",
      title: errorMessage,
    });
  }
};
export const logoutUser = () => async (dispatch, getState) => {
  dispatch({
    type: userLoading,
    payload: { ...getState().user, userLoading: true },
  });
  try {
    dispatch({
      type: userSuccess,
      payload: {
        userLoading: false,
        userData: {},
        userError: "",
      },
    });
    localStorage.removeItem("user");
  } catch (error) {
    dispatch({
      type: userError,
      payload: {
        ...getState().user,
        userLoading: false,
        userError: error.response ? error.response.data.error : error.message,
      },
    });
  }
};
export const getProfile = (values) => async (dispatch, getState) => {
  dispatch({
    type: userLoading,
    payload: { ...getState().user, userLoading: true },
  });
  try {
    const { data } = await client.get("/user/profile/", {
      headers: {
        authorization: `Bearer ${values.token}`,
      },
    });

    dispatch({
      type: userSuccess,
      payload: {
        userLoading: false,
        userData: data,
        userError: "",
      },
    });
  } catch (error) {
    dispatch({
      type: userError,
      payload: {
        ...getState().user,
        userLoading: false,
        userError: error.response ? error.response.data.error : error.message,
      },
    });
  }
};
export const changeProfile = (values) => async (dispatch, getState) => {
  dispatch({
    type: userLoading,
    payload: {
      ...getState().user,
      userData: { ...getState().user.userData, IsSuccessChangeProfile: false },
      userLoading: true,
    },
  });
  try {
    const { data } = await client.post(
      "/user/profile/change",
      {
        ...values,
        age: Number(values.age),
      },
      {
        headers: {
          authorization: `Bearer ${values.token}`,
        },
      }
    );

    dispatch({
      type: userSuccess,
      payload: {
        userData: { ...data, IsSuccessChangeProfile: true },
        userLoading: false,
        userError: "",
      },
    });
    Toast.fire({
      icon: "success",
      title: `${data.username} change profile successfully`,
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.error
      : error.message;
    dispatch({
      type: userError,
      payload: {
        ...getState().user,
        userLoading: false,
        userError: errorMessage,
      },
    });
    Toast.fire({
      icon: "error",
      title: errorMessage,
    });
  }
};
export const ChangePasswordUser = (values) => async (dispatch, getState) => {
  dispatch({
    type: userLoading,
    payload: {
      ...getState().user,
      userData: { ...getState().user.userData, IsSuccessChangePassword: false },
      userLoading: true,
    },
  });
  try {
    const data = await client.put(
      "/user/changePassword",
      {
        oldPassword: values.old_password,
        newPassword: values.new_password,
      },
      {
        headers: {
          authorization: `Bearer ${values.token}`,
        },
      }
    );

    dispatch({
      type: userSuccess,
      payload: {
        userData: {
          ...getState().user.userData,
          IsSuccessChangePassword: true,
        },
        userLoading: false,
        userError: "",
      },
    });
    Toast.fire({
      icon: "success",
      title: `${values.username} change password successfully`,
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.error
      : error.message;
    dispatch({
      type: userError,
      payload: {
        ...getState().user,
        userLoading: false,
        userError: errorMessage,
      },
    });
    Toast.fire({
      icon: "error",
      title: errorMessage,
    });
  }
};
export const UploadProfileImage = (values) => async (dispatch, getState) => {
  const base64Response = await fetch(`${values.newImage}`);
  const blob = await base64Response.blob();
  const formData = new FormData();
  formData.append("image", blob, "filename.jpg");

  dispatch({
    type: userLoading,
    payload: {
      ...getState().user,
      userData: {
        ...getState().user.userData,
        IsSuccessUploadProfileImage: false,
      },
      userLoading: true,
    },
  });
  try {
    const data = await client.put("/user/changeProfileImage", formData, {
      headers: {
        authorization: `Bearer ${values.token}`,
      },
    });
    dispatch({
      type: userSuccess,
      payload: {
        userData: {
          ...getState().user.userData,
          IsSuccessUploadProfileImage: true,
        },
        userLoading: false,
        userError: "",
      },
    });
    Toast.fire({
      icon: "success",
      title: `profile image changed successfully`,
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.error
      : error.message;
    dispatch({
      type: userError,
      payload: {
        ...getState().user,
        userLoading: false,
        userError: errorMessage,
      },
    });
    Toast.fire({
      icon: "error",
      title: errorMessage,
    });
  }
};
