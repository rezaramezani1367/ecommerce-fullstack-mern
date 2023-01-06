import { Box, Stack, useMediaQuery } from "@mui/material";
import ProducsItem from "../ProducsItem";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, getAllProducts } from "../../redux/actionProducts";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import ErrorPage from "../ErrorPage";
import FilterSection from "./FilterSection";
import StickyBox from "react-sticky-box";
import FilterPagination from "./FilterPagination";
import {
  useQueryParams,
  StringParam,
  NumberParam,
  ArrayParam,
  withDefault,
} from "use-query-params";
import FilterSectionMobile from "./FilterSectionMobile";

const MyFilterParam = withDefault(ArrayParam, []);
const FilterProduct = () => {
  // open dialog for mobile screen
  const [open, setOpen] = React.useState(false);

  const mediumViewport = useMediaQuery("(min-width:900px)");
  const [query, setQuery] = useQueryParams({
    min_price: NumberParam,
    max_price: NumberParam,
    categories: MyFilterParam,
    colors: MyFilterParam,
    brands: MyFilterParam,
  });
  const [queryPage, setQueryPage] = useQueryParams({
    page: NumberParam,
  });
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

  // send data to server
  useEffect(() => {
    console.log("first 1");
    setQueryPage({ page: undefined });
    dispatch(filterProducts(query));
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    // if (!mediumViewport) {
    //   setOpen(false);
    // }
  }, [query]);
  useEffect(() => {
    dispatch(filterProducts({ ...query, ...queryPage }));
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [queryPage]);
  return (
    <Box
      display="flex"
      flexDirection={mediumViewport ? "row" : "column"}
      alignItems="flex-start"
      gap={2}
      sx={{}}
    >
      {mediumViewport ? (
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
              setQuery={setQuery}
              setQueryPage={setQueryPage}
              queryPage={queryPage}
              query={query}
            />
          </Box>
        </StickyBox>
      ) : (
        <FilterSectionMobile open={open} setOpen={setOpen} countProduct={paginationData.totalDocs}>
          <Box padding={1.5}>
            <FilterSection
              productData={productData}
              category={category}
              color={color}
              brand={brand}
              maxPrice={maxPrice}
              setQuery={setQuery}
              setQueryPage={setQueryPage}
              queryPage={queryPage}
              query={query}
            />
          </Box>
        </FilterSectionMobile>
      )}

      <Box width="100%">
        {productLoading ? (
          <Loading />
        ) : (
          <>
            <Grid container>
              {paginationData.docs.map((item, index) => (
                <Grid xs={12} sm={6} lg={4} key={item._id}>
                  <ProducsItem item={item} />
                </Grid>
              ))}
            </Grid>
            <FilterPagination
              paginationData={paginationData}
              queryPage={queryPage}
              setQueryPage={setQueryPage}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default FilterProduct;
