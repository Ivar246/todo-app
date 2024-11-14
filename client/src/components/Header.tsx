import {
  AppBar,
  styled,
  Toolbar,
  Typography,
  List,
  ListItem,
  InputBase,
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

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

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
          <Typography variant="h6">Todo app</Typography>
        </Link>

        <Search>
          <InputBase fullWidth placeholder="search..." />
        </Search>
        <List sx={{ display: "flex", width: "12rem" }}>
          {isLoggedIn ? (
            <ListItem onClick={handleLogout}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#fff",
                  "&:hover": {
                    cursor: "pointer",
                    transform: "scale(1.02)",
                    color: "#fff",
                  },
                }}
              >
                Logout
              </Typography>
            </ListItem>
          ) : (
            <>
              <ListItem>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Typography>Login</Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Typography>Sign Up </Typography>
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
