import { AccountCircle, LocationCity, Person, Wc } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, InputAdornment, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomField } from "./Login";
import { HeaderProfile } from "./Profile";
import { useFormik } from "formik";
import { changeProfile } from "../redux/actionUser";
import { Toast } from "../redux/actionCart";
import { useNavigate } from "react-router-dom";

const ChangeProfile = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const {
    user: { userLoading, userData, userError },
  } = useSelector((last) => last);
  const dispatch = useDispatch();
  const validate = (values) => {
    let errors = {};
    if (values.firstname.length < 3) {
      errors.firstname = "firstname must be at least 3 characters";
    }
    if (values.lastname.length < 3) {
      errors.lastname = "lastname must be at least 3 characters";
    }
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
    if (values.city.length < 3) {
      errors.city = "city must be at least 3 characters";
    }
    if (!(/^[1-9][0-9]*$/.test(values.age) && values.age >= 15)) {
      errors.age = "Age must be number and  at least 15";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      gender: "",
      age: "",
      city: "",
    },
    onSubmit: (values) => {
      setStatus(true);
      dispatch(changeProfile({ ...values, token: userData.token }));
    },
    validate,
  });
  useEffect(() => {
    if (status && userData.IsSuccessChangeProfile) {
      navigate("/profile");
      console.log("second");
    }
  }, [userData, status]);

  return (
    <HeaderProfile value="2">
      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <Box
          padding={3}
          sx={{
            display: "grid",
            flexGrow: 1,
            gap: 3,
            gridTemplateColumns: { xs: "1fr", md: "repeat(2,1fr)" },
          }}
        >
          <CustomField
            error={formik.errors.firstname && formik.touched.firstname}
            helperText={
              formik.errors.firstname && formik.touched.firstname
                ? formik.errors.firstname
                : ""
            }
            label="First name"
            name="firstname"
            id="firstname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            size="small"
            fullWidth
          />
          <CustomField
            error={formik.errors.lastname && formik.touched.lastname}
            helperText={
              formik.errors.lastname && formik.touched.lastname
                ? formik.errors.lastname
                : ""
            }
            label="Last name"
            name="lastname"
            id="lastname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            size="small"
            fullWidth
          />
          <CustomField
            error={formik.errors.gender && formik.touched.gender}
            helperText={
              formik.errors.gender && formik.touched.gender
                ? formik.errors.gender
                : ""
            }
            label="Gender"
            name="gender"
            id="gender"
            select
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Wc />
                </InputAdornment>
              ),
            }}
            size="small"
            fullWidth
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </CustomField>
          <CustomField
            error={formik.errors.age && formik.touched.age}
            helperText={
              formik.errors.age && formik.touched.age ? formik.errors.age : ""
            }
            type="number"
            label="Age"
            name="age"
            id="age"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
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
        </Box>
        <Box className="text-center mt-3">
          <LoadingButton
            loading={userLoading}
            loadingPosition="start"
            sx={{ minWidth: 120 }}
            variant="contained"
            startIcon={<Person />}
            type="submit"
          >
            change profile
          </LoadingButton>
        </Box>
      </Box>
    </HeaderProfile>
  );
};

export default ChangeProfile;
