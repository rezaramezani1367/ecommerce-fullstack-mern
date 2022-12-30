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
import StickyBox from "react-sticky-box";

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
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
      <StickyBox offsetTop={70} offsetBottom={20}>
        <Box
          border="1px solid"
          borderColor="divider"
          alignSelf="flex-start"
          minWidth={270}
          width={300}
        >
          <FilterSection
            productData={productData}
            category={category}
            color={color}
            brand={brand}
            maxPrice={maxPrice}
          />
        </Box>
      </StickyBox>

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
    </Box>
  );
};

export default FilterProduct;
