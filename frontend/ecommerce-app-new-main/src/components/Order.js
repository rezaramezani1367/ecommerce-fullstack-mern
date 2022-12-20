import { ExpandMore } from "@mui/icons-material";
import {
  Paper,
  Box,
  Stack,
  Unstable_Grid2 as Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "../redux/actionCart";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getOrderDetails } from "../redux/actionOrder";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import { baseUrl } from "../redux/constants";

const Order = () => {
  const { id } = useParams();
  const {
    user: { userLoading, userData, userError },
    order: { orderLoading, orderData, orderError },
  } = useSelector((last) => last);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDetails({ token: userData.token, id }));
  }, []);

  switch (true) {
    case !Boolean(userData.username):
      Toast.fire({
        icon: "info",
        title: `Please Login again`,
      });
      return <Navigate to="/login" />;
    case orderLoading:
      return <Loading />;
    case Boolean(orderError):
      return <ErrorPage error={orderError} />;

    default:
      return (
        <>
          {/* cart section */}
          <Accordion
            disableGutters
            sx={{ border: 1, borderBottom: 0, borderColor: "divider" }}
            defaultExpanded={true}
          >
            <AccordionSummary
              sx={{ borderBottom: 1, borderColor: "divider" }}
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Order Info</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                className="overflow-auto  p-1"
                sx={{ maxHeight: { xs: 350, md: "100%" } }}
              >
                <Paper
                  elevation={1}
                  sx={{ display: { xs: "none", md: "block", borderRadius: 0 } }}
                >
                  <Grid
                    container
                    gap={1}
                    padding={1}
                    alignItems="center"
                    className="text-center font-bold text-xl capitalize"
                    sx={{ borderBottom: 1, borderColor: "divider" }}
                  >
                    <Grid sx={{ width: { xs: 200, md: 170 } }}>Image</Grid>
                    <Grid md={3}>Name</Grid>
                    <Grid md>Price</Grid>
                    <Grid md={3}>count</Grid>
                    <Grid md>SubTotal</Grid>
                  </Grid>
                </Paper>
                {orderData[0]?.orderItems.map(
                  ({ product, qty, _id }, index) => (
                    <Paper
                      key={_id}
                      elevation={2}
                      sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        borderRadius: 0,
                        textAlign: { md: "left", md: "center" },
                      }}
                      className="overflow-hidden p-2 md:p-0 relative"
                    >
                      <Grid
                        container
                        padding={1}
                        sx={{
                          alignItems: { xs: "start", md: "center" },
                          gap: { xs: 1 },
                        }}
                      >
                        <Grid sx={{ width: { xs: 200, md: 170 }, height: 100 }}>
                          <Box
                            sx={{
                              justifyContent: { xs: "start", sm: "center" },
                              border: { xs: 0, sm: 1, md: 0 },
                              borderColor: { xs: "", sm: "divider", md: "" },
                            }}
                            className="w-full h-full flex items-center"
                          >
                            <img
                              src={baseUrl + product.image}
                              alt="11"
                              className="max-h-full max-w-full"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "/images/no-image-blue.png";
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid xs={12} sm={6} md={3}>
                          <Stack
                            direction="row"
                            gap={1}
                            alignItems="center"
                            sx={{
                              justifyContent: { sm: "start", md: "center" },
                            }}
                            className="capitalize"
                          >
                            <Typography
                              variant="span"
                              className="font-bold border-r pr-2 text-lg"
                              sx={{ display: { xs: "block", sm: "none" } }}
                            >
                              Name
                            </Typography>
                            <Typography variant="span" className="text-lg">
                              {product.name}
                            </Typography>
                          </Stack>
                        </Grid>

                        <Grid xs={12} sm={3} md sx={{ alignSelf: "center" }}>
                          <Stack
                            direction="row"
                            gap={1}
                            alignItems="center"
                            sx={{
                              justifyContent: { sm: "start", md: "center" },
                            }}
                            className="capitalize"
                          >
                            <Typography
                              variant="span"
                              className="font-bold border-r pr-2 text-lg"
                              sx={{ display: { xs: "block", md: "none" } }}
                            >
                              Price
                            </Typography>
                            <Typography variant="span" className="text-lg ">
                              {product.price?.toFixed(2)}$
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid xs={12} sm={4} md={3}>
                          <Stack
                            direction="row"
                            gap={1}
                            alignItems="center"
                            sx={{
                              justifyContent: { sm: "start", md: "center" },
                            }}
                            className="capitalize"
                          >
                            <Typography
                              variant="span"
                              className="font-bold border-r pr-2 text-lg"
                              sx={{ display: { xs: "block", md: "none" } }}
                            >
                              Count
                            </Typography>
                            <Typography
                              variant="span"
                              className="text-xl text-red-500"
                            >
                              {qty}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid xs={12} sm={4} md sx={{ alignSelf: "center" }}>
                          <Stack
                            direction="row"
                            gap={1}
                            alignItems="center"
                            sx={{
                              justifyContent: { sm: "start", md: "center" },
                            }}
                            className="capitalize"
                          >
                            <Typography
                              variant="span"
                              className="font-bold border-r pr-2 text-lg"
                              sx={{ display: { xs: "block", md: "none" } }}
                            >
                              SubTotal
                            </Typography>
                            <Typography
                              variant="span"
                              className="text-lg text-red-500"
                            >
                              {(product.price * qty)?.toFixed(2)}$
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Paper>
                  )
                )}
              </Box>
              <Box
                elevation={3}
                className="flex justify-end items-center mt-2 py-1.5"
              >
                <Paper
                  sx={{ border: 1, borderColor: "divider" }}
                  className="flex w-72 gap-2 items-center p-2 font-bold "
                >
                  <Typography
                    variant="h6"
                    component="span"
                    className="border-r pr-2"
                  >
                    Total Price
                  </Typography>
                  <Typography
                    variant="span"
                    className="flex-1 text-xl text-red-500"
                  >
                    {orderData[0]?.totalPrice?.toFixed(2)}$
                  </Typography>
                </Paper>
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* shipping address section */}
          <Accordion
            disableGutters
            sx={{ border: 1, borderColor: "divider" }}
            defaultExpanded={true}
          >
            <AccordionSummary
              sx={{ borderBottom: 1, borderColor: "divider" }}
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Address Info In Order</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "grid",
                  flexGrow: 1,
                  gap: 3,
                  gridTemplateColumns: {
                    xs: "100px 1fr",
                    md: "100px 1fr 100px 1fr",
                  },
                  alignItems: "center",
                }}
              >
                <Box className="border-r font-bold capitalize">Address</Box>
                <Box className="">{orderData[0]?.shippingAddress.address}</Box>
                <Box className="border-r font-bold capitalize">City</Box>
                <Box>{orderData[0]?.shippingAddress.city}</Box>
                <Box className="border-r font-bold capitalize">postal code</Box>
                <Box>{orderData[0]?.shippingAddress.postalCode}</Box>
                <Box className="border-r font-bold capitalize">Phone</Box>
                <Box>{orderData[0]?.shippingAddress.phone}</Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </>
      );
  }
};

export default Order;
