import {
  Box,
  Typography,
  Slider,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";

const minDistance = 10;
function valuetext(value) {
  return `${value}°C`;
}
const FilterSection = () => {
  const [price, setPrice] = useState([0, 100000]);
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };
  console.log(price);
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
        <Box marginTop={2}>
          <Typography
            variant="p"
            component="p"
            fontSize={18}
            fontWeight="bold"
            sx={{ borderBottom: 1, borderColor: "divider", paddingBottom: 1 }}
          >
            Price
          </Typography>
          <Slider
            sx={{ marginTop: 2 }}
            getAriaLabel={() => "Minimum distance"}
            value={price}
            onChange={handleChange1}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            max={100000}
            disableSwap
          />
          <Stack direction="row" justifyContent="space-between">
            <Box
              sx={{
                border: 1,
                borderColor: "divider",
                paddingY: 0.7,
                minWidth: 100,
                textAlign: "center",
              }}
            >
              {price[0]}
            </Box>
            <Box
              sx={{
                border: 1,
                borderColor: "divider",
                paddingY: 0.7,
                minWidth: 100,
                textAlign: "center",
              }}
            >
              {price[1]}
            </Box>
          </Stack>
        </Box>
        <Box marginTop={2}>
          <Typography
            variant="p"
            component="p"
            fontSize={18}
            fontWeight="bold"
            sx={{ borderBottom: 1, borderColor: "divider", paddingBottom: 1 }}
          >
            Category
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Label"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Label"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Label"
            />
          </FormGroup>
        </Box>
        <Box marginTop={2}>
          <Typography
            variant="p"
            component="p"
            fontSize={18}
            fontWeight="bold"
            sx={{ borderBottom: 1, borderColor: "divider", paddingBottom: 1 }}
          >
            Brand
          </Typography>
        </Box>
        <Box marginTop={2}>
          <Typography
            variant="p"
            component="p"
            fontSize={18}
            fontWeight="bold"
            sx={{ borderBottom: 1, borderColor: "divider", paddingBottom: 1 }}
          >
            Color
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterSection;
