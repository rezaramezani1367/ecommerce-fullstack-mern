import { Close, KeyboardArrowUp, Tune } from "@mui/icons-material";
import {
  Box,
  Dialog,
  IconButton,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import React, { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const FilterSectionMobile = ({ open, setOpen, children,countProduct }) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box borderBottom={1} borderColor="divider" width="100%" padding={0.5}>
        <Box
          display="flex"
          gap={0.3}
          sx={{ cursor: "pointer" }}
          onClick={handleClickOpen}
        >
          <Tune />
          Filter
        </Box>
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box
          display="flex"
          justifyContent="end"
          paddingx={2}
          position="sticky"
          top={10}
          right={10}
          zIndex={10}
        >
          <IconButton
            //   edge="start"
            // color="inherit"
            sx={{
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.main" },
            }}
            onClick={handleClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
        </Box>
        {children}
        <Paper
        elevation={2}
          sx={{
            position: "sticky",
            bottom: 0,
            left: 0,
            borderTop: 1,
            borderColor: "divider",
            padding: 2,
            borderRadius: 0,
            cursor:'pointer'
          }}
          onClick={handleClose}
        >
          <Box display="flex"  justifyContent="space-between">
            <KeyboardArrowUp />
            <Typography fontSize={14} fontWeight="bold">View <Typography color="error.main" component={"span"} variant="h5">{countProduct}</Typography> products</Typography>
          </Box>
        </Paper>
      </Dialog>
    </>
  );
};

export default FilterSectionMobile;
