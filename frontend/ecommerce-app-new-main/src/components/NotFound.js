import { ShoppingCart } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

const Notfound = () => {
  return (
    <Box className="flex justify-center items-center  text-red-600 font-bold h-96 gap-2">
      <Typography variant="h4" component="span">
        Page Not found
      </Typography>
    </Box>
  );
};

export default Notfound;
