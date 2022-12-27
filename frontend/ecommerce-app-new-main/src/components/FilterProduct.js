import { Box, Stack } from "@mui/material";
import ProducsItem from "./ProducsItem";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actionProducts";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import FilterSection from "./FilterSection";

const FilterProduct = () => {
  const {
    products: {
      productLoading,
      productData,
      paginationData,
      category,
      color,
      brand,
      maxPrice,
    },
  } = useSelector((last) => last);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <Stack direction="row" gap={1}>
      <Box
        minWidth={270}
        width={300}
        border="1px solid"
        borderColor="divider"
        alignSelf="flex-start"
        position="sticky"
        sx={{
          maxHeight: "83vh",
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "transparent",
            width: 3,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#ccc",
            minHeight: 10,
          },
        }}
        top={70}
      >
        <FilterSection
          productData={productData}
          category={category}
          color={color}
          brand={brand}
          maxPrice={maxPrice}
        />
      </Box>
      <Box width="100%">
        {productLoading ? (
          <Loading />
        ) : (
          <Grid container>
            {paginationData.map((item, index) => (
              <Grid xs={12} md={6} lg={4} key={item._id}>
                <ProducsItem item={item} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Stack>
  );
};

export default FilterProduct;
