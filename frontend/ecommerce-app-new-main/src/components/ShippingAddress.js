import {
  AccountCircle,
  Email,
  Key,
  LocalShipping,
  LocationCity,
  LocationOn,
  MarkunreadMailbox,
  PhoneAndroid,
  Portrait,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomField, HeaderLogin } from "./Login";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Toast } from "../redux/actionCart";
import { LoadingButton } from "@mui/lab";
import { createUser } from "../redux/actionUser";
import { textAlign } from "@mui/system";

const ShippingAddress = () => {
  const currentAddress = localStorage.getItem("address")
    ? JSON.parse(localStorage.getItem("address"))
    : {
        address: "",
        city: "",
        postalCode: "",
        phone: "",
      };
  const {
    user: { userLoading, userData, userError },
  } = useSelector((last) => last);
  const navigate = useNavigate();
  const validate = (values) => {
    let errors = {};
    if (values.address.length < 10) {
      errors.address = "address must be at least 10 characters";
    }
    if (values.city.length < 3) {
      errors.city = "City must be at least 3 characters";
    }
    if (!/^[1-9][0-9]{9}$/.test(values.postalCode)) {
      errors.postalCode = `The postalCode field must be number(10character) and Should
  not begin with 0 example 1234567890`;
    }
    if (!/^[0][9][0-9]{9}$/.test(values.phone)) {
      errors.phone = `The phone field must be number(11character) and started by
      09 example 09123456789`;
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: currentAddress,
    enableReinitialize: true,
    onSubmit: (values) => {
      localStorage.setItem("address", JSON.stringify(values));
      Toast.fire({
        icon: "success",
        title: `shipping addrss submitted successfully`,
      });
      navigate("/checkout");
    },
    validate,
  });


  switch (true) {
    default:
      return (
        <Box
          className="flex justify-center items-center font-bold text-2xl"
          sx={{ fontWeight: "700" }}
        >
          <Paper
            className=" w-full md:w-150 overflow-hidden"
            sx={{ borderRadius: "1.8rem" }}
            elevation={4}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                overflow: "hidden",
                padding: 2.2,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                }}
                variant="h5"
              >
                Shipping Address
              </Typography>
            </Box>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <Box className="flex flex-col gap-4 p-4">
                <CustomField
                  error={formik.errors.address && formik.touched.address}
                  helperText={
                    formik.errors.address && formik.touched.address
                      ? formik.errors.address
                      : ""
                  }
                  label="Address"
                  name="address"
                  id="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  fullWidth
                />
                <CustomField
                  error={formik.errors.city && formik.touched.city}
                  helperText={
                    formik.errors.city && formik.touched.city
                      ? formik.errors.city
                      : ""
                  }
                  label="City"
                  name="city"
                  id="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCity />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  fullWidth
                />

                <CustomField
                  error={formik.errors.postalCode && formik.touched.postalCode}
                  helperText={
                    formik.errors.postalCode && formik.touched.postalCode
                      ? formik.errors.postalCode
                      : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MarkunreadMailbox />
                      </InputAdornment>
                    ),
                  }}
                  label="PostalCode"
                  name="postalCode"
                  id="postalCode"
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="small"
                  fullWidth
                />
                <CustomField
                  error={formik.errors.phone && formik.touched.phone}
                  helperText={
                    formik.errors.phone && formik.touched.phone
                      ? formik.errors.phone
                      : ""
                  }
                  label="Phone"
                  name="phone"
                  id="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroid />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  fullWidth
                />
              </Box>
              <Divider />
              <Box className="text-center p-3">
                <Button
                  sx={{ minWidth: 120 }}
                  variant="contained"
                  startIcon={<LocalShipping />}
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      );
  }
};

export default ShippingAddress;
