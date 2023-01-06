import { Box, Pagination } from "@mui/material";
import React from "react";

const FilterPagination = ({
  paginationData: { totalPages, page },
  setQueryPage
}) => {
  const handleChange = (event, value) => {
    setQueryPage({ page: value === 1 ? undefined : value });
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
