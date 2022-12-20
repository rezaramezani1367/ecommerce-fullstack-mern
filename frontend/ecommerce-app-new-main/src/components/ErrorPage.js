import { Box, Typography } from "@mui/material";
import React from "react";

const ErrorPage = ({ error }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="300px"
    >
      <Typography variant="h5" fontWeight='600' color='error.main'>{error}</Typography>
    </Box>
  );
};

export default ErrorPage;
