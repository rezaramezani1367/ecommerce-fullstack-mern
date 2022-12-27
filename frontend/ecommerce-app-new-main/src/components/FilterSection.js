import {
  Box,
  Typography,
  Slider,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  styled,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
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

const Accordion = styled((props) => (
  <MuiAccordion disableGutters square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderTop: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

// create a custom parameter with a default value
const MyFilterParam = withDefault(ArrayParam, []);
const minDistance = 10;
function valuetext(value) {
  return `${value}°C`;
}
const FilterSection = ({ productData, category, color, brand, maxPrice }) => {
  const [query, setQuery] = useQueryParams({
    min_price: NumberParam,
    max_price: NumberParam,
    categories: MyFilterParam,
    colors: MyFilterParam,
    brands: MyFilterParam,
  });
  const dispatch = useDispatch();
  const [price, setPrice] = useState([0, 10000]);
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
  // set max_price from server
  useEffect(() => {
    setPrice([0, Math.ceil(maxPrice)]);
  }, [maxPrice]);

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
      <Box>
        {/* price section */}
        <Accordion
          disableGutters
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="p" fontSize={18} fontWeight="bold">
              Price
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={price}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              onChangeCommitted={() => {
                // setSearchParams({ min_price: price[0], max_price: price[1] });
                setQuery({ min_price: price[0], max_price: price[1] });
              }}
              max={Math.ceil(maxPrice)}
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
          </AccordionDetails>
        </Accordion>
        <Accordion
          eve
          disableGutters
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="p" fontSize={18} fontWeight="bold">
              Category
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </Accordion>

        <Accordion
          evedisableGutters
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            borderRadius: 0,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="p" fontSize={18} fontWeight="bold">
              Brand
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </Accordion>
        <Accordion
          eve
          disableGutters
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="p" fontSize={18} fontWeight="bold">
              Color
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {color.map((item, index) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      size="small"
                      // checked={categorySelected[index] ?? false}
                      onChange={(e) => colorHandler(e, index)}
                    />
                  }
                  label={item.toLowerCase()}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default FilterSection;
