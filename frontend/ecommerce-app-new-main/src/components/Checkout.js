import { ShoppingCartCheckout, Edit, ExpandMore } from "@mui/icons-material";
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "../redux/actionCart";
import { Navigate, useNavigate } from "react-router-dom";
import { submitOrder } from "../redux/actionOrder";

const Checkout = () => {
  const [status, setStatus] = useState(false);
  const currentAddress = JSON.parse(localStorage.getItem("address"));
  const [totalPrice, setTotalPrice] = useState(0);
  const {
    cart: { cartLoading, cartData, cartError },
    user: { userLoading, userData, userError },
    order: { orderLoading, orderData, orderError },
  } = useSelector((last) => last);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    let result = 0;
    cartData.forEach((item) => {
      result += item.quantity * item.price;
    });
    setTotalPrice(result);
  }, [cartData]);

  useEffect(() => {
    if (status && Object.keys(orderData).length) {
      navigate(`/order/${orderData[0]._id}`);
      Toast.fire({
        icon: "success",
        title: "order submitted successfully",
      });
    }
  }, [orderData]);

  const SubmitOrders = () => {
    setStatus(true);
    const orderItems = cartData.map((item, index) => {
      return { product: item._id, qty: item.quantity };
    });

    dispatch(
      submitOrder({
        orderItems,
        shippingAddress: currentAddress,
        paymentMethod: "cash",
        shippingPrice: "0",
        totalPrice,
        token: userData.token,
      })
    );
  };

  switch (true) {
    case !Boolean(localStorage.getItem("address")):
      Toast.fire({
        icon: "info",
        title: `Please complete shipping address`,
      });
      return <Navigate to="/address" />;
    case !Boolean(Object.keys(cartData).length):
      Toast.fire({
        icon: "info",
        title: `Cart is Empty`,
      });
      return <Navigate to="/cart" />;
    case !Boolean(userData.username):
      Toast.fire({
        icon: "info",
        title: `Please Login again`,
      });
      return <Navigate to="/" />;

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
              <Typography>Cart Info</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                className="overflow-auto  p-1"
                sx={{ maxHeight: { xs: 350, md: "100%" } }}
              >
                <Paper
                  elevation={4}
                  className=""
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
                {cartData.map((item, index) => (
                  <Paper
                    key={item._id}
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
                          className="w-full h-full flex items-center cursor-pointer"
                          onClick={() => navigate(`/product/${item._id}`)}
                        >
                          <img
                            src={item.image}
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
                          sx={{ justifyContent: { sm: "start", md: "center" } }}
                          className="capitalize cursor-pointer"
                          onClick={() => navigate(`/product/${item._id}`)}
                        >
                          <Typography
                            variant="span"
                            className="font-bold border-r pr-2 text-lg"
                            sx={{ display: { xs: "block", sm: "none" } }}
                          >
                            Name
                          </Typography>
                          <Typography variant="span" className="text-lg">
                            {item.name}
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid xs={12} sm={3} md sx={{ alignSelf: "center" }}>
                        <Stack
                          direction="row"
                          gap={1}
                          alignItems="center"
                          sx={{ justifyContent: { sm: "start", md: "center" } }}
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
                            {item.price.toFixed(2)}$
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid xs={12} sm={4} md={3}>
                        <Stack
                          direction="row"
                          gap={1}
                          alignItems="center"
                          sx={{ justifyContent: { sm: "start", md: "center" } }}
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
                            {item.quantity}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid xs={12} sm={4} md sx={{ alignSelf: "center" }}>
                        <Stack
                          direction="row"
                          gap={1}
                          alignItems="center"
                          sx={{ justifyContent: { sm: "start", md: "center" } }}
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
                            {(item.price * item.quantity).toFixed(2)}$
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Box>
              <Box
                elevation={3}
                className="flex justify-between items-center mt-2 py-1.5"
              >
                <Button
                  size="small"
                  startIcon={<Edit />}
                  variant="contained"
                  color="secondary"
                  sx={{
                    textTransform: "capitalize",
                    minWidth: { sx: 50, sm: 110 },
                  }}
                  onClick={() => navigate("/cart")}
                >
                  Cart
                </Button>
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
                    {totalPrice.toFixed(2)}$
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
              <Typography>Address Info</Typography>
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
                <Box className="">{currentAddress.address}</Box>
                <Box className="border-r font-bold capitalize">City</Box>
                <Box>{currentAddress.city}</Box>
                <Box className="border-r font-bold capitalize">postal code</Box>
                <Box>{currentAddress.postalCode}</Box>
                <Box className="border-r font-bold capitalize">Phone</Box>
                <Box>{currentAddress.phone}</Box>
              </Box>
              <Button
                size="small"
                startIcon={<Edit />}
                variant="contained"
                color="secondary"
                sx={{
                  textTransform: "capitalize",

                  marginTop: 3,
                  minWidth: 110,
                }}
                onClick={() => navigate("/address")}
              >
                Address
              </Button>
            </AccordionDetails>
          </Accordion>
          <Box className="flex justify-center mt-10">
            <Button
              size="large"
              variant="contained"
              startIcon={<ShoppingCartCheckout />}
              sx={{ textTransform: "capitalize" }}
              onClick={SubmitOrders}
            >
              Submit Order
            </Button>
          </Box>
        </>
      );
  }
};

export default Checkout;
