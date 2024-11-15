import {
  AppBar,
  styled,
  Toolbar,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";

import { useDispatch } from "react-redux";
import { logOutSuccess } from "../redux/user/userSlice";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const StyledTypography = styled(Typography)({
  color: "#fff",
  fontWeight: "bold",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.02)",
    color: "#fff",
  },
  "&:hover::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "2px",
    backgroundColor: "#fff",
    transition: "width 0.3s ease",
  },
});

const Header = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutSuccess());
  };
  return (
    <AppBar
      position="fixed"
      sx={{ height: "3.5rem", display: "flex", justifyContent: "center" }}
    >
      <StyledToolbar>
        <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", transform: "scale(1.02)" }}
          >
            Todo App
          </Typography>
        </Link>

        <List sx={{ display: "flex", width: "12rem" }}>
          {isLoggedIn ? (
            <>
              <ListItem>
                <Link to="/todos" style={{ textDecoration: "none" }}>
                  <StyledTypography>Todos</StyledTypography>
                </Link>
              </ListItem>
              <ListItem onClick={handleLogout}>
                <StyledTypography>Logout</StyledTypography>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <StyledTypography>Login</StyledTypography>
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <StyledTypography>Sign Up </StyledTypography>
                </Link>
              </ListItem>
            </>
          )}
        </List>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
