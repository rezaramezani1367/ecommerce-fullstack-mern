import { Box, Pagination, PaginationItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getPaginateProducts } from "../redux/actionProducts";
const pageSize = 9;
const PaginationProducs = ({ setNewLoading }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [page, setPage] = useState(parseInt(query.get("page") || "1", 10));
  const [paginationData, setPaginationData] = useState({
    count: 0,
    from: (page - 1) * pageSize,
    to: page * pageSize,
  });
  const {
    products: { productData },
  } = useSelector((last) => last);
  const dispatch = useDispatch();

  useEffect(() => {
    setNewLoading(true);
    setPage(parseInt(query.get("page") || "1", 10));
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    dispatch(getPaginateProducts((page - 1) * pageSize, page * pageSize));
    setPaginationData({ ...paginationData, count: productData.length });
    const timer = setTimeout(() => {
      setNewLoading(false);
    }, 50);
    return () => clearTimeout(timer);
  }, [paginationData.from, location.search, page]);

  const handlePageChange = (e, page) => {
    setPaginationData({
      ...paginationData,
      from: (page - 1) * pageSize,
      to: page * pageSize,
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      paddingTop={2}
      marginTop={3}
      marginBottom={1}
      borderTop={1}
      borderColor="divider"
    >
      <Pagination
        siblingCount={1}
        boundaryCount={1}
        page={page}
        count={Math.ceil(paginationData.count / pageSize)}
        variant="outlined"
        color="secondary"
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`${item.page === 1 ? "" : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
    </Box>
  );
};

export default PaginationProducs;
