import {
  Box,
  Typography,
  Slider,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const minDistance = 10;
function valuetext(value) {
  return `${value}°C`;
}
const FilterSection = ({ productData, category, color, brand }) => {
  const [searchParams, setSearchParams] = useSearchParams({});

  const [price, setPrice] = useState([0, 100000]);
  const [categorySelected, setCategorySelected] = useState([]);
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
  const CategoryHandler = () => {};
  useEffect(() => {}, [categorySelected]);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          paddingBottom: 1,
          paddingY: 1,
          paddingX: 0.5,
        }}
      >
        <Typography
          variant="h6"
          component="p"
          color="secondary"
          fontSize={25}
          textAlign="center"
        >
          Filter Section
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          // sx={{ marginTop: 3 }}
          onClick={() => {
            setSearchParams({});
            console.log({ searchParams });
          }}
        >
          Clear
        </Button>
      </Stack>
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
            onChangeCommitted={() => {
              setSearchParams({ min_price: price[0], max_price: price[1] });
              console.log(searchParams.entries());
              console.log(price);
            }}
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
            {category.map((item, index) => (
              <FormControlLabel
                onChange={CategoryHandler}
                control={<Checkbox size="small" />}
                label={item}
              />
            ))}
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
          <FormGroup>
            {brand.map((item, index) => (
              <FormControlLabel
                onChange={CategoryHandler}
                control={<Checkbox size="small" />}
                label={item}
              />
            ))}
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
            Color
          </Typography>
          <FormGroup>
            {color.map((item, index) => (
              <FormControlLabel
                onChange={CategoryHandler}
                control={<Checkbox size="small" />}
                label={item}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterSection;
