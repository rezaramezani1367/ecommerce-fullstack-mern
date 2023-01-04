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
  TextField,
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
const minDistance = 1;
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
  const [price, setPrice] = useState([0, 0]);
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
    setQuery((last) => {
      const help = [...last.categories];
      if (event.target.checked) {
        help.push(category[index]);
      } else {
        const indexQueryCat = help.indexOf(category[index]);
        if (indexQueryCat >= 0) help.splice(indexQueryCat, 1);
      }

      return { ...last, categories: [...help] };
    });
  };

  // handle color checked
  const colorHandler = (event, index) => {
    setQuery((last) => {
      const help = [...last.colors];
      if (event.target.checked) {
        help.push(color[index]);
      } else {
        const indexQueryColor = help.indexOf(color[index]);
        if (indexQueryColor >= 0) help.splice(indexQueryColor, 1);
      }

      return { ...last, colors: [...help] };
    });
  };

  // handle brand checked
  const brandHandler = (event, index) => {
    setQuery((last) => {
      const help = [...last.brands];
      if (event.target.checked) {
        help.push(brand[index]);
      } else {
        const indexQueryBrand = help.indexOf(brand[index]);
        if (indexQueryBrand >= 0) help.splice(indexQueryBrand, 1);
      }

      return { ...last, brands: [...help] };
    });
  };

  // set max_price from server
  useEffect(() => {
    if (query.max_price || query.min_price) {
      // console.log({ max: query.max_price, min: query.min_price });
      setPrice([query.min_price, query.max_price]);
    } else {
      setPrice([0, Math.ceil(maxPrice)]);
    }
  }, [maxPrice]);

  // send data to server
  useEffect(() => {
    // console.log(query);
    setQuery({ page: undefined });
    dispatch(filterProducts(query));
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    if (query.min_price == undefined) {
      setPrice([0, Math.ceil(maxPrice)]);
    }
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
          onClick={() => {
            setPrice([0, Math.ceil(maxPrice)]);
            setQuery((last) => {
              return {
                max_price: undefined,
                min_price: undefined,
                categories: undefined,
                brands: undefined,
                colors: undefined,
              };
            });
          }}
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
                setPrice(price);
                setQuery({ min_price: price[0], max_price: price[1] });
              }}
              max={Math.ceil(maxPrice)}
              disableSwap
            />
            <Stack direction="row" justifyContent="space-between">
              <TextField
                sx={{
                  width: 100,
                }}
                size="small"
                value={price[0]}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (!isNaN(value)) {
                    handleChange1(e, [value, price[1]], 0);
                    setQuery({
                      min_price:
                        value <= price[1] - minDistance
                          ? value
                          : price[1] - minDistance,
                      max_price: price[1],
                    });
                  }
                }}
                label="min"
              />
              <TextField
                sx={{
                  width: 100,
                }}
                size="small"
                value={price[1]}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (!isNaN(value) && value <= maxPrice) {
                    handleChange1(e, [price[0], value], 1);
                    setQuery({
                      min_price: price[0],
                      max_price:
                        value >= price[0] + minDistance
                          ? value
                          : price[0] + minDistance,
                    });
                  }
                }}
                label="max"
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion
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
                      checked={query.categories.includes(category[index])}
                      size="small"
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
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            borderRadius: 0,
          }}
          defaultExpanded={true}
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
                      checked={query.brands.includes(brand[index])}
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
                      checked={query.colors.includes(color[index])}
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
