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
    products: { productLoading, productData, productError, paginationData },
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
        minHeight="80vh"
        borderColor="divider"
        alignSelf='flex-start'
        position='sticky'
        top={70}
        // borderRadius={1}
      >
        <FilterSection />
      </Box>
      <Box width="100%">
        {productLoading ? (
          <Loading />
        ) : (
          <Grid container>
            {productData.map((item, index) => (
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