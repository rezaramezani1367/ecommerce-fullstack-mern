import {
  LoginOutlined,
  Login as LoginIcon,
  Portrait,
  Key,
  Email,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Toast } from "../redux/actionCart";
import {
  Box,
  InputAdornment,
  Paper,
  styled,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/actionUser";

export const CustomField = styled(TextField)(() => ({
  "& input": {
    padding: "0.75rem 0.5rem",
    overflow: "hidden",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#717D7E",
      borderRadius: "3rem",
    },
    borderRadius: "0 3rem 3rem 0",
  },
}));
export const HeaderLogin = ({ value }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", overflow: "hidden" }}>
      <Tabs value={value} aria-label="basic tabs" sx={{ bgcolor: "" }}>
        <Tab
          icon={<LoginIcon />}
          iconPosition="start"
          label="Login"
          value="1"
          onClick={() => navigate("/login")}
        />
        <Tab
          icon={<Portrait />}
          iconPosition="start"
          label="Signup"
          value="2"
          onClick={() => navigate("/signup")}
        />
      </Tabs>
    </Box>
  );
};
const Login = () => {
  const [status, setStatus] = useState(false);
  const {
    user: { userLoading, userData, userError },
  } = useSelector((last) => last);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validate = (values) => {
    let errors = {};

    if (
      !(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ||
        values.email.length >= 5
      )
    ) {
      errors.email = "Please enter your valid email or username";
    }
    if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(
        values.password
      )
    ) {
      errors.password = `password must be at least 8 characters, at least one
      uppercase letter, one lowercase letter, one number and one
      special character`;
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: (values) => {
      dispatch(loginUser(values));
      setStatus(true);
    },
    validate,
    onReset: (values) => {
      return {
        password: "",
        email: "",
      };
    },
  });
  useEffect(() => {
    if (status && userData.IsSuccessLogin) {
      navigate("/");
    }
  }, [userData, status]);
  switch (true) {
    case Boolean(userData.username):
      Toast.fire({
        icon: "success",
        title: `${userData.username} login successfully`,
      });
      return <Navigate to="/" />;

    default:
      return (
        <>
          <Box className="flex justify-center items-center">
            <Paper
              className=" w-full md:w-150 overflow-hidden"
              sx={{ borderRadius: "1.8rem" }}
              elevation={4}
            >
              <HeaderLogin value="1" />
              <Box
                component="form"
                className="flex flex-col gap-4 p-4"
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
              >
                <CustomField
                  error={formik.errors.email && formik.touched.email}
                  helperText={
                    formik.errors.email && formik.touched.email
                      ? formik.errors.email
                      : ""
                  }
                  label="Email or Username"
                  name="email"
                  id="email"
                  autoComplete="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  fullWidth
                />

                <CustomField
                  error={formik.errors.password && formik.touched.password}
                  helperText={
                    formik.errors.password && formik.touched.password
                      ? formik.errors.password
                      : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Key />
                      </InputAdornment>
                    ),
                  }}
                  label="Password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="small"
                  fullWidth
                  type="password"
                />

                <Box className="text-center">
                  <LoadingButton
                    loading={userLoading}
                    loadingPosition="start"
                    sx={{ minWidth: 120 }}
                    variant="contained"
                    startIcon={<LoginOutlined />}
                    type="submit"
                  >
                    Login
                  </LoadingButton>
                </Box>
              </Box>
            </Paper>
          </Box>
        </>
      );
  }
};

export default Login;
