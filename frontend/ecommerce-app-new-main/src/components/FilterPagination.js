import { Box, Pagination } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  useQueryParams,
  StringParam,
  NumberParam,
  ArrayParam,
  withDefault,
} from "use-query-params";
import { filterProducts } from "../redux/actionProducts";

const FilterPagination = ({ paginationData: { totalPages, page } }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
  });
  const handleChange = (event, value) => {
    setQuery({ page: value });
    dispatch(filterProducts({ page: value ,...query}));
  };
  return (
    <>
      {totalPages > 1 && (
        <Box
          marginY={3}
          display="flex"
          justifyContent="center"
          borderTop={1}
          borderColor="divider"
          padding={1}
        >
          <Pagination
            count={totalPages}
            page={page ?? 1}
            color="secondary"
            variant="outlined"
            onChange={handleChange}
          />
        </Box>
      )}
    </>
  );
};

export default FilterPagination;
