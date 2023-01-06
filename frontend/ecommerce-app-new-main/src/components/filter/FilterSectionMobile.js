import { Close, Tune } from "@mui/icons-material";
import { Box, Dialog, IconButton, Paper, Slide, Typography } from "@mui/material";
import React, { forwardRef } from "react";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const FilterSectionMobile = ({open, setOpen,children}) => {
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  return (
    <>
      <Box border={1} borderColor="divider" width="100%" padding={0.5}>
        <Box display="flex" gap={0.3} sx={{ cursor: "pointer" }} onClick={handleClickOpen} >
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
        <Box display='flex' justifyContent='end' paddingx={2} position='sticky' top={10} right={10} zIndex={10}>
          
            <IconButton
            //   edge="start"
            //   color="inherit"
              sx={{bgcolor:'secondary.main'}}
              onClick={handleClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
           
        </Box>
        {children}
      </Dialog>
    </>
  );
};

export default FilterSectionMobile;
