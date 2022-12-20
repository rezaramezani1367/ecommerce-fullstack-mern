import { Close, Crop, FileUpload, HighlightOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Avatar as AvatarMui,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadProfileImage } from "../redux/actionUser";
import { HeaderProfile } from "./Profile";
import Avatar from "react-avatar-edit";
import { Toast } from "../redux/actionCart";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../redux/constants";

const UploadAvatar = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const {
    user: { userLoading, userData, userError },
  } = useSelector((last) => last);
  const dispatch = useDispatch();
  const [newImage, setNewImage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewImage(null);
  };

  const onBeforeFileLoad = (elem) => {
    let format = ["jpg", "png", "jpeg", "jfif", "pjpeg", "pjp"];
    if (!format.includes(elem.target.value.split(".")[1])) {
      alert(`format image must be ${format.join("/")}`);
      elem.target.value = "";
    }

    // size <=2mb
    if (elem.target.files[0].size > 2048000) {
      alert("The size of the photo must be less than 2 MB");
      elem.target.value = "";
    }
  };
  const onCrop = (preview) => {
    setNewImage(preview);
  };
  const onClose = () => {
    setNewImage(null);
  };
  useEffect(() => {
    if (status && userData.IsSuccessUploadProfileImage) {
      navigate("/profile");
    }
  }, [userData, status]);
  return (
    <HeaderProfile value="4">
      <Box
        component="form"
        className={`flex justify-center items-center flex-col gap-3 ${
          userLoading ? "pointer-events-none" : ""
        }`}
        onSubmit={(e) => e.preventDefault()}
      >
        <Box className="h-48  justify-center items-center">
          <Box className="w-48 h-full">
            <AvatarMui
              variant={""}
              alt="The image"
              src={newImage ? newImage : baseUrl + userData.image}
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: grey[300],
              }}
              className="border cursor-pointer"
              onClick={handleClickOpen}
            />
          </Box>
        </Box>
        {newImage ? (
          <IconButton
            onClick={() => {
              setNewImage("");
            }}
          >
            <HighlightOff />
          </IconButton>
        ) : (
          ""
        )}
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            startIcon={<Crop />}
            color="info"
            onClick={handleClickOpen}
            sx={{ textTransform: "capitalize" }}
          >
            select avatar
          </Button>
          <LoadingButton
            loading={userLoading}
            variant="contained"
            sx={{ textTransform: "capitalize" }}
            type="submit"
            startIcon={<FileUpload />}
            onClick={() => {
              if (newImage) {
                dispatch(UploadProfileImage({ newImage, ...userData }));
                setStatus(true);
              } else {
                Toast.fire({
                  icon: "error",
                  title: `please select new avatar image`,
                });
              }
            }}
          >
            upload
          </LoadingButton>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              textAlign: "center",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            {"Upload Image Profile"}
          </DialogTitle>
          <DialogContent
            sx={{
              marginY: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxHeight: 400,
            }}
          >
            <Box sx={{ minWidth: 250, maxWidth: 450 }}>
              <Avatar
                width={390}
                height={295}
                src=""
                alt=""
                onCrop={onCrop}
                onClose={onClose}
                onBeforeFileLoad={onBeforeFileLoad}
                exportAsSquare={true}
                // exportQuality={0}
                exportSize={400}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => setOpen(false)}
              autoFocus
              startIcon={<Crop />}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
              endIcon={<Close />}
            >
              close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </HeaderProfile>
  );
};

export default UploadAvatar;
