import { Box, Typography } from "@mui/material";
import React from "react";

const FilterSection = () => {
  return (
    <Box>
      <Typography
        variant="h6"
        component="p"
        color="secondary"
        fontSize={25}
        textAlign="center"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          paddingBottom: 1,
          paddingY: 1,
        }}
      >
        Filter Section
      </Typography>
      <Box padding={2}>
        {/* price section */}
        <Box marginTop={1}>
          <Typography
            variant="p"
            component="p"
            fontSize={18}
            fontWeight="bold"
            sx={{ borderBottom: 1, borderColor: "divider", paddingBottom: 1 }}
          >
            Price
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterSection;
