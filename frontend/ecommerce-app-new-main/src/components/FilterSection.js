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
import {
  useQueryParams,
  StringParam,
  NumberParam,
  ArrayParam,
  withDefault,
} from "use-query-params";
import { filterProducts } from "../redux/actionProducts";
import { useDispatch } from "react-redux";


// create a custom parameter with a default value
const MyFilterParam = withDefault(ArrayParam, []);
const minDistance = 10;
function valuetext(value) {
  return `${value}°C`;
}
const FilterSection = ({ productData, category, color, brand }) => {
  const [query, setQuery] = useQueryParams({
    min_price: NumberParam,
    max_price: NumberParam,
    categories: MyFilterParam,
    colors: MyFilterParam,
    brands: MyFilterParam,
  });
  const dispatch = useDispatch();
  const { min_price: num, max_price: searchQuery, categories } = query;
  const [price, setPrice] = useState([0, 100000]);
  const [categorySelected, setCategorySelected] = useState([]);
  const [colorSelected, setColorSelected] = useState([]);
  const [brandSelected, setBrandSelected] = useState([]);
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

  // handle category checked
  const CategoryHandler = (event, index) => {
    setCategorySelected((last) => {
      const help = [...last];
      help[index] = event.target.checked;
      return help;
    });
  };
  useEffect(() => {
    if (category.length) {
      setCategorySelected((last) => {
        const categoryItem = [];
        category.forEach((item) => categoryItem.push(false));
        return categoryItem;
      });
    }
  }, [category]);
  useEffect(() => {
    const categoryItem = [];
    categorySelected.forEach((item, index) => {
      if (item) {
        categoryItem.push(category[index]);
      }
    });
    setQuery({ categories: [...categoryItem] });
  }, [categorySelected]);
  // handle color checked
  const colorHandler = (event, index) => {
    setColorSelected((last) => {
      const help = [...last];
      help[index] = event.target.checked;
      return help;
    });
  };
  useEffect(() => {
    if (color.length) {
      setColorSelected((last) => {
        const colorItem = [];
        color.forEach((item) => colorItem.push(false));
        return colorItem;
      });
    }
  }, [color]);
  useEffect(() => {
    const colorItem = [];
    colorSelected.forEach((item, index) => {
      if (item) {
        colorItem.push(color[index]);
      }
    });
    setQuery({ colors: [...colorItem] });
  }, [colorSelected]);
  // handle brand checked
  const brandHandler = (event, index) => {
    setBrandSelected((last) => {
      const help = [...last];
      help[index] = event.target.checked;
      return help;
    });
  };
  useEffect(() => {
    if (brand.length) {
      setBrandSelected((last) => {
        const brandItem = [];
        brand.forEach((item) => brandItem.push(false));
        return brandItem;
      });
    }
  }, [brand]);
  useEffect(() => {
    const brandItem = [];
    brandSelected.forEach((item, index) => {
      if (item) {
        brandItem.push(brand[index]);
      }
    });
    setQuery({ brands: [...brandItem] });
  }, [brandSelected]);

  // send data to server
  useEffect(() => {
    // console.log(query);
    dispatch(filterProducts(query));
  }, [query]);

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
          onClick={() => {}}
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
              // setSearchParams({ min_price: price[0], max_price: price[1] });
              setQuery({ min_price: price[0], max_price: price[1] });
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
                key={item}
                control={
                  <Checkbox
                    size="small"
                    // checked={categorySelected[index] ?? false}
                    onChange={(e) => CategoryHandler(e, index)}
                  />
                }
                label={item.toLowerCase()}
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
                key={item}
                control={
                  <Checkbox
                    size="small"
                    onChange={(e) => brandHandler(e, index)}
                  />
                }
                label={item.toLowerCase()}
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
                key={item}
                control={
                  <Checkbox
                    size="small"
                    onChange={(e) => colorHandler(e, index)}
                  />
                }
                label={item.toLowerCase()}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterSection;
