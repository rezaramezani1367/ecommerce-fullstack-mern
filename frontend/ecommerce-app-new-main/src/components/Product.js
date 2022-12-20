import { Stack, Rating, Button, Box, Paper, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../redux/actionProducts";
import Grid from "@mui/material/Unstable_Grid2";
import {
  StarOutline,
  Add,
  Remove,
  Visibility,
  ShoppingCart,
  Delete,
  Info,
} from "@mui/icons-material";
import { addToCart, minusFromCart } from "../redux/actionCart";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import { baseUrl } from "../redux/constants";

const Product = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    products: { productLoading, productData, productError },
    cart: { cartLoading, cartData, cartError },
  } = useSelector((last) => last);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct(id));
  }, []);
  useEffect(() => {
    const currentData = cartData.filter((item) => item._id == id);
    currentData ? setCart(currentData) : setCart(null);
  }, [cartData]);

  switch (true) {
    case productLoading:
      return <Loading />;
    case Boolean(productError):
      return <ErrorPage error={productError} />;

    default:
      return (
        <Paper sx={{ border: 1, borderColor: "divider", padding: 1 }}>
          {productData.map((item, index) => (
            <Grid
              container
              spacing={2}
              key={item._id}
              className="items-start justify-center"
            >
              <Grid rowSpacing={0} xs={12} md={6} className="relative ">
                <Box
                  className="w-full p-3 flex justify-center items-center"
                  sx={{ border: 0.25, borderColor: "divider", height: 350 }}
                >
                  <img
                    src={baseUrl + item.image}
                    alt={item.name}
                    className="max-h-full max-w-full"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/images/no-image-blue.png";
                    }}
                  />
                </Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  className="absolute bottom-5 left-3 text-yellow-500 z-10 w-full"
                >
                  <Rating
                    size="small"
                    name="text-feedback"
                    defaultValue={item.rating}
                    readOnly
                    precision={0.25}
                    sx={{
                      fontSize: "1rem",
                    }}
                    emptyIcon={
                      <StarOutline
                        className="text-slate-400"
                        sx={{
                          fontSize: "1rem",
                        }}
                      />
                    }
                  />
                  <Box className="text-red-800 w-20 font-bold">
                    <Typography variant="span"> {item.numReviews} 1</Typography>
                    <Visibility fontSize="small" />
                  </Box>
                </Stack>
              </Grid>
              <Grid
                container
                xs={12}
                md={6}
                padding={2.5}
                rowSpacing={2}
                className="h-full"
              >
                <Grid
                  xs={3}
                  sx={{ borderLeft: 1, borderTop: 1, borderColor: "divider" }}
                  className="font-bold capitalize"
                >
                  Name
                </Grid>
                <Grid
                  xs={9}
                  sx={{ border: 1, borderBottom: 0, borderColor: "divider" }}
                  className=" capitalize"
                >
                  {item.name}
                </Grid>
                <Grid
                  xs={3}
                  sx={{ borderLeft: 1, borderTop: 1, borderColor: "divider" }}
                  className="font-boldcapitalize"
                >
                  Category
                </Grid>
                <Grid
                  xs={9}
                  sx={{ border: 1, borderBottom: 0, borderColor: "divider" }}
                  className="apitalize"
                >
                  {item.category}
                </Grid>
                <Grid
                  xs={3}
                  sx={{ borderLeft: 1, borderTop: 1, borderColor: "divider" }}
                  className="font-boldcapitalize"
                >
                  color
                </Grid>
                <Grid
                  xs={9}
                  sx={{ border: 1, borderBottom: 0, borderColor: "divider" }}
                  className="apitalize"
                >
                  {item.color}
                </Grid>
                <Grid
                  xs={3}
                  sx={{ borderLeft: 1, borderTop: 1, borderColor: "divider" }}
                  className="font-boldcapitalize"
                >
                  brand
                </Grid>
                <Grid
                  xs={9}
                  sx={{ border: 1, borderBottom: 0, borderColor: "divider" }}
                  className="apitalize"
                >
                  {item.brand}
                </Grid>
                <Grid
                  xs={3}
                  sx={{ borderLeft: 1, borderTop: 1, borderColor: "divider" }}
                  className="font-bold capitalize"
                >
                  count In Stock
                </Grid>
                <Grid
                  xs={9}
                  sx={{ border: 1, borderBottom: 0, borderColor: "divider" }}
                  className="capitalize"
                >
                  {item.countInStock}
                </Grid>
                <Grid
                  xs={3}
                  sx={{ borderLeft: 1, borderTop: 1, borderColor: "divider" }}
                  className="font-bold capitalize"
                >
                  price
                </Grid>
                <Grid
                  xs={9}
                  sx={{ border: 1, borderBottom: 0, borderColor: "divider" }}
                  className="capitalize text-red-500"
                >
                  {item.price.toFixed(2)}$
                </Grid>
                <Grid
                  xs={3}
                  sx={{ border: 1, borderRight: 0, borderColor: "divider" }}
                  className="font-bold capitalize"
                >
                  description
                </Grid>
                <Grid
                  xs={9}
                  sx={{ border: 1, borderColor: "divider" }}
                  className="capitalize"
                >
                  {item.description}
                </Grid>
                <Stack
                  direction="row"
                  className="mt-5 w-full gap-2 items-center"
                >
                  {item.countInStock ? (
                    cart?.length ? (
                      <>
                        <Paper
                          elevation={1}
                          sx={{ border: 1, borderColor: "divider" }}
                          className="flex justify-between items-center overflow-hidden"
                        >
                          <Button
                            size="large"
                            disableElevation
                            disableRipple
                            disableFocusRipple
                            sx={{ borderRadius: "0", minWidth: 50 }}
                            onClick={() => dispatch(minusFromCart(item))}
                          >
                            {cart[0]?.quantity == 1 ? (
                              <Delete sx={{ color: "red" }} />
                            ) : (
                              <Remove sx={{ color: "red" }} />
                            )}
                          </Button>
                          <Stack>
                            <Typography
                              variant="span"
                              className="w-12 min-h-full font-bold text-center text-lg"
                            >
                              {cart[0]?.quantity}
                            </Typography>
                            {cart[0].quantity == item.countInStock && (
                              <Typography
                                variant="span"
                                className="w-12 min-h-full font-bold text-center text-red-500"
                              >
                                max
                              </Typography>
                            )}
                          </Stack>
                          <Button
                            size="large"
                            disableElevation
                            disableRipple
                            disableFocusRipple
                            sx={{ borderRadius: "0", minWidth: 50 }}
                            onClick={() => dispatch(addToCart(item))}
                          >
                            <Add />
                          </Button>
                        </Paper>

                        <Button
                          size="small"
                          variant="outlined"
                          color="secondary"
                          className="capitalize"
                          onClick={() => navigate("/cart")}
                        >
                          view Cart
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        startIcon={<ShoppingCart />}
                        onClick={() => dispatch(addToCart(item))}
                      >
                        Add To Cart
                      </Button>
                    )
                  ) : (
                    <Button
                      variant="contained"
                      color="info"
                      startIcon={<Info />}
                      sx={{ textTransform: "capitalize" }}
                    >
                      Notify when available
                    </Button>
                  )}
                </Stack>
              </Grid>
            </Grid>
          ))}
        </Paper>
      );
  }
};

export default Product;
