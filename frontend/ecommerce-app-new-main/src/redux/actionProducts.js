import {
  productLoading,
  productSuccess,
  productError,
  client,
} from "./constants";

export const getAllProducts = () => async (dispatch, getState) => {
  dispatch({
    type: productLoading,
    payload: { ...getState().products, productLoading: true },
  });
  try {
    const { data } = await client.get("/product/");
    // console.log(data);
    dispatch({
      type: productSuccess,
      payload: {
        ...getState().products,
        productLoading: false,
        productData: [...data.data],
        productError: "",
        category: [...data.categories],
        color: [...data.colors],
        brand: [...data.brands],
        maxPrice: data.maxPrice,
      },
    });
  } catch (error) {
    dispatch({
      type: productError,
      payload: {
        ...getState().products,
        productLoading: false,
        productError: error.message,
      },
    });
  }
};
export const getProduct = (id) => async (dispatch, getState) => {
  dispatch({
    type: productLoading,
    payload: { ...getState().products, productLoading: true },
  });
  try {
    const { data } = await client.get(`/product/${id}`);
    dispatch({
      type: productSuccess,
      payload: {
        ...getState().products,
        productLoading: false,
        productData: [data.data],
        productError: "",
      },
    });
  } catch (error) {
    dispatch({
      type: productError,
      payload: {
        ...getState().products,
        productLoading: false,
        productError: error.message,
      },
    });
  }
};
export const getPaginateProducts = (from, to) => (dispatch, getState) => {
  dispatch({
    type: productLoading,
    payload: { ...getState().products, productLoading: true },
  });

  try {
    dispatch({
      type: productSuccess,
      payload: {
        ...getState().products,
        productLoading: false,
        productError: "",
        paginationData: {
          docs: getState().products.productData.slice(from, to),
        },
      },
    });
  } catch (error) {
    dispatch({
      type: productError,
      payload: {
        ...getState().products,
        productLoading: false,
        productError: error.message,
      },
    });
  }
};
export const filterProducts = (query) => async (dispatch, getState) => {
  dispatch({
    type: productLoading,
    payload: { ...getState().products, productLoading: true },
  });

  try {
    console.log(query);
    const {
      data: { data },
    } = await client.post("/product/filter", { ...query });
    console.log(data.docs);
    dispatch({
      type: productSuccess,
      payload: {
        ...getState().products,
        productLoading: false,
        productError: "",
        paginationData: { ...data },
      },
    });
    console.log(getState().products);
  } catch (error) {
    dispatch({
      type: productError,
      payload: {
        ...getState().products,
        productLoading: false,
        productError: error.message,
      },
    });
  }
};
