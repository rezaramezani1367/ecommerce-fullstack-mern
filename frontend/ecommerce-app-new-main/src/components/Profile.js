import {
  Avatar,
  Box,
  Paper,
  Tab,
  Tabs,
  Unstable_Grid2 as Grid,
  useMediaQuery,
} from "@mui/material";
import { grey, pink } from "@mui/material/colors";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../redux/actionUser";
import { Navigate, useNavigate } from "react-router-dom";
import {
  AccountBox,
  Key,
  Login,
  ManageAccounts,
  Portrait,
} from "@mui/icons-material";
import Loading from "./Loading";
import { baseUrl } from "../redux/constants";
const Profile = () => {
  const {
    user: { userLoading, userData, userError },
  } = useSelector((last) => last);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile(userData));
  }, []);

  return (
    <HeaderProfile value="1">
      {userLoading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 3,
          }}
        >
          <Box>
            <Avatar
              variant={""}
              alt="The image"
              src={baseUrl + userData.image}
              sx={{
                width: 100,
                height: 100,
                bgcolor: grey[400],
              }}
              className="border"
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              flexGrow: 1,
              gap: 3,
              gridTemplateColumns: {
                xs: "100px 1fr",
                lg: "100px 1fr 100px 1fr",
              },
              alignItems: "center",
            }}
          >
            <Box className="border-r font-bold capitalize">user name</Box>
            <Box>{userData.username}</Box>
            <Box className="border-r font-bold capitalize">email</Box>
            <Box>{userData.email}</Box>
            <Box className="border-r font-bold capitalize">mobile</Box>
            <Box>{userData.mobile}</Box>
            <Box className="border-r font-bold capitalize">first name</Box>
            <Box>{userData.firstname}</Box>
            <Box className="border-r font-bold capitalize">last name</Box>
            <Box>{userData.lastname}</Box>
            <Box className="border-r font-bold capitalize">gender</Box>
            <Box>{userData.gender}</Box>
            <Box className="border-r font-bold capitalize">age</Box>
            <Box>{userData.age}</Box>
            <Box className="border-r font-bold capitalize">city</Box>
            <Box>{userData.city}</Box>
          </Box>
        </Box>
      )}
    </HeaderProfile>
  );
};
export const HeaderProfile = ({ value, children }) => {
  const {
    user: { userLoading, userData, userError },
  } = useSelector((last) => last);
  const navigate = useNavigate();
  const mediumViewport = useMediaQuery("(min-width:700px)");
  switch (true) {
    case !Boolean(userData.username):
      return <Navigate to="/login" />;

    default:
      return (
        <Box
          flexDirection={mediumViewport ? "row" : "column"}
          sx={{ width: "100%", display: "flex", gap: 2 }}
        >
          <Box>
            <Paper elevation={3} className="sticky top-20">
              <Tabs
                orientation={mediumViewport ? "vertical" : "horizontal"}
                scrollButtons="auto"
                allowScrollButtonsMobile
                variant="scrollable"
                value={value}
                aria-label="basic tabs"
              >
                <Tab
                  icon={<AccountBox />}
                  iconPosition={mediumViewport ? "top" : "start"}
                  sx={{ textTransform: "capitalize" }}
                  label="Profile"
                  value="1"
                  onClick={() => navigate("/profile")}
                />
                <Tab
                  icon={<ManageAccounts />}
                  iconPosition={mediumViewport ? "top" : "start"}
                  sx={{ textTransform: "capitalize" }}
                  label="Change Profile"
                  value="2"
                  onClick={() => navigate("/profile/change")}
                />
                <Tab
                  icon={<Key />}
                  iconPosition={mediumViewport ? "top" : "start"}
                  sx={{ textTransform: "capitalize" }}
                  label="Change Password"
                  value="3"
                  onClick={() => navigate("/profile/password")}
                />

                <Tab
                  icon={<Portrait />}
                  iconPosition={mediumViewport ? "top" : "start"}
                  sx={{ textTransform: "capitalize" }}
                  label="Upload Image"
                  value="4"
                  onClick={() => navigate("/profile/avatar")}
                />
              </Tabs>
            </Paper>
          </Box>
          <Paper elevation={4} className="flex-1 p-4">
            {children}
          </Paper>
        </Box>
      );
  }
};
export default Profile;
