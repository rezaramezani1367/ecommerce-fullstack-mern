import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate ,Navigate} from "react-router-dom";
import { getOrders } from "../redux/actionOrder";
import {
  Paper,
  Box,
  Stack,
  Unstable_Grid2 as Grid,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import { Toast } from "../redux/actionCart";

const Orders = () => {
  const {
    user: { userLoading, userData, userError },
    order: { orderLoading, orderData, orderError },
  } = useSelector((last) => last);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders({ token: userData.token }));
  }, []);

  switch (true) {
    case !Boolean(userData.username):
      Toast.fire({
        icon: "info",
        title: `Please Login again`,
      });
      return <Navigate to="/" />;
    case orderLoading:
      return <Loading />;
    case Boolean(orderError):
      return <ErrorPage error={orderError} />;

    default:
      return (
        <>
          <Paper
            elevation={1}
            className=""
            sx={{ display: { borderRadius: 0 } }}
            // xs: "none", md: "block",
          >
            <Grid
              container
              gap={1}
              padding={1}
              alignItems="center"
              className="text-center font-bold text-xl capitalize"
              sx={{ border: 1, borderColor: "divider" }}
            >
              <Grid xs={1}>#</Grid>
              <Grid xs>Count Items</Grid>
              <Grid xs>Total price</Grid>
            </Grid>
          </Paper>
          {orderData.map((item, index) => (
            <Paper
              key={item._id}
              elevation={1}
              sx={{
                borderRadius: 0,
                "&:hover": (theme) => ({
                  backgroundColor:
                    theme.palette.mode == "light"
                      ? theme.palette.grey[200]
                      : theme.palette.grey[900],
                }),
                transition: "all 0.3s ease-in",
              }}
              onClick={() => navigate(`/order/${item._id}`)}
            >
              <Grid
                container
                gap={1}
                padding={1}
                alignItems="center"
                className="text-center font-semibold text-lg capitalize"
                sx={{
                  border: 1,
                  borderTop: 0,
                  borderColor: "divider",
                  cursor: "pointer",
                }}
              >
                <Grid xs={1} color="error.main" fontWeight={500}>
                  {index + 1}
                </Grid>
                <Grid xs>{item.orderItems.length} </Grid>
                <Grid color="error.main" xs>
                  {item.totalPrice.toFixed(2)}$
                </Grid>
              </Grid>
            </Paper>
          ))}
        </>
      );
  }
};

export default Orders;
