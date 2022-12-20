import { HeaderProfile } from "./Profile";
import { Box, InputAdornment, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomField, HeaderLogin } from "./Login";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Toast } from "../redux/actionCart";
import { LoadingButton } from "@mui/lab";
import { ChangePasswordUser } from "../redux/actionUser";
import { Key, Person } from "@mui/icons-material";

const ChangePassword = () => {
  const [status, setStatus] = useState(false);
  const {
    user: { userLoading, userData, userError },
  } = useSelector((last) => last);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validate = (values) => {
    let errors = {};

    if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(
        values.old_password
      )
    ) {
      errors.old_password = `password must be at least 8 characters, at least one
      uppercase letter, one lowercase letter, one number and one
      special character`;
    }
    if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(
        values.new_password
      )
    ) {
      errors.new_password = `new password must be at least 8 characters, at least one
      uppercase letter, one lowercase letter, one number and one
      special character`;
    }
    if (
      !(
        values.new_password === values.confrim_new_password &&
        values.confrim_new_password
      )
    ) {
      errors.confrim_new_password = "new Password not matched";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confrim_new_password: "",
    },
    onSubmit: (values) => {
      dispatch(ChangePasswordUser({ ...values, ...userData }));
      setStatus(true);
    },
    validate,
  });
  useEffect(() => {
    if (status && userData.IsSuccessChangePassword) {
      navigate("/profile");
    }
  }, [userData, status]);

  return (
    <HeaderProfile value="3">
      <Box component="form" onSubmit={formik.handleSubmit}>
        <input hidden autoComplete="username" />
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
            error={formik.errors.old_password && formik.touched.old_password}
            helperText={
              formik.errors.old_password && formik.touched.old_password
                ? formik.errors.old_password
                : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              ),
            }}
            label="Old Password"
            name="old_password"
            id="old_password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="small"
            fullWidth
            type="password"
          />
          <CustomField
            error={formik.errors.new_password && formik.touched.new_password}
            helperText={
              formik.errors.new_password && formik.touched.new_password
                ? formik.errors.new_password
                : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              ),
            }}
            autoComplete="new-password"
            label="New Password"
            name="new_password"
            id="new_password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="small"
            fullWidth
            type="password"
          />
          <CustomField
            error={
              formik.errors.confrim_new_password &&
              formik.touched.confrim_new_password
            }
            helperText={
              formik.errors.confrim_new_password &&
              formik.touched.confrim_new_password
                ? formik.errors.confrim_new_password
                : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              ),
            }}
            autoComplete="new-password"
            label="Confrim New Password"
            name="confrim_new_password"
            id="confrim_new_password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="small"
            fullWidth
            type="password"
          />
        </Box>
        <Box className="text-center mt-3">
          <LoadingButton
            loading={userLoading}
            loadingPosition="start"
            sx={{ minWidth: 120 }}
            variant="contained"
            startIcon={<Key />}
            type="submit"
          >
            change password
          </LoadingButton>
        </Box>
      </Box>
    </HeaderProfile>
  );
};

export default ChangePassword;
