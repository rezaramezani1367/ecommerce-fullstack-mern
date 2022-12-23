import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  styled,
  Container,
  ListItemIcon,
} from "@mui/material";

import {
  NightsStay,
  ShoppingCart,
  Menu as MenuIcon,
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  LightMode,
  Home,
  Login,
  Logout,
  Grading,
  Settings,
  FilterList,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logoutUser } from "../redux/actionUser";
import { Toast } from "../redux/actionCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 18,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
export default function Header({ setMode, mode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countCard, setCountCard] = React.useState(0);
  const {
    cart: { cartLoading, cartData, cartError },
    user: { userLoading, userData, userError },
  } = useSelector((last) => last);
  React.useEffect(() => {
    let result = 0;
    cartData.forEach((item) => {
      result += item.quantity;
    });
    setCountCard(result);
  }, [cartData]);
  React.useEffect(() => {
    // validation token
    dispatch(getProfile(userData));
  }, []);
  React.useEffect(() => {
    // validation token when faild
    const errorAuth = [
      "invalid signature",
      "please log in",
      "Please authenticate!",
    ];
    if (errorAuth.includes(userError)) {
      dispatch(logoutUser());
      Toast.fire({
        title: `Please login again`,
        icon: "success",
      });
    }
  }, [, userError]);
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 35,
        horizontal: 42,
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/profile");
        }}
      >
        <ListItemIcon>
          <AccountCircle fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/orders");
        }}
      >
        <ListItemIcon>
          <Grading fontSize="small" />
        </ListItemIcon>
        Orders
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/profile/change");
        }}
      >
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Setting
      </MenuItem>
      <MenuItem
        onClick={() => {
          Toast.fire({
            title: `${userData.username} loged out successfully`,
            icon: "success",
          });
          dispatch(logoutUser());
          handleMenuClose();
        }}
      >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Exit
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <Box alignItems="center" display="flex" gap={3}>
            <Box display="flex" alignItems="center">
              <NavLink to="/">
                <Box alignItems="center" display="flex">
                  <Home />
                  <Typography
                    variant="h6"
                    marginLeft={0.5}
                    textTransform="capitalize"
                    noWrap
                    component="span"
                  >
                    home
                  </Typography>
                </Box>
              </NavLink>
            </Box>

            <NavLink to="/filter">
              <Box alignItems="center" display="flex">
                <FilterList />
                <Typography
                  variant="h6"
                  marginLeft={0.5}
                  textTransform="capitalize"
                  noWrap
                  component="span"
                >
                  filter products
                </Typography>
              </Box>
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box className="flex gap-1">
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => {
                toggleColorMode();
              }}
            >
              {mode == "light" ? <LightMode /> : <NightsStay />}
            </IconButton>
            <NavLink to="/cart">
              <IconButton size="large" aria-label="cart" color="inherit">
                <StyledBadge badgeContent={countCard} color="error">
                  <ShoppingCart />
                </StyledBadge>
              </IconButton>
            </NavLink>
            {userData?.username ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            ) : (
              <NavLink to="/login">
                <IconButton size="large" edge="end" color="inherit">
                  <Login />
                </IconButton>
              </NavLink>
            )}
          </Box>
        </Toolbar>

        {renderMenu}
      </Container>
    </AppBar>
  );
}
