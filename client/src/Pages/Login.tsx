import { styled } from "@mui/material/styles";
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Close, NotificationAdd } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logInSuccess } from "../redux/user/userSlice";
// import NotificationModel from "../components/NotificationModel";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
}));

const StyledContainer = styled(Container)({
  height: "90vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};
interface LoginState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginState>({
    email: "",
    password: "",
  });

  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      dispatch(logInSuccess(data));
      navigate("/todos");
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      console.log(error);
    }
  };
  return (
    <>
      {/* <NotificationModel message="hladfklsadj" /> */}
      <Modal
        open={showNotification}
        onClose={() => console.log("kl")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={() => setShowNotification(!showNotification)}
            aria-label="close"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: (theme) => theme.palette.primary.main,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
            }}
          >
            <Close />
          </IconButton>
          <Typography variant="h6" component="h2" sx={{ color: "#1976d2" }}>
            Notification{" "}
            <span>
              <NotificationAdd />
            </span>
          </Typography>
          <Typography sx={{ mt: 2 }}>Welcome to todo app</Typography>
        </Box>
      </Modal>

      {error && <Alert severity="error">{error}</Alert>}
      <StyledContainer>
        <Box sx={{ padding: 3, border: "1px solid #ddd", borderRadius: "8px" }}>
          <Typography variant="h5" gutterBottom>
            Log In
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Log In
            </Button>
          </form>
          <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
            <Item>
              {" "}
              Don't have an account?
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                Sign Up
              </Link>
            </Item>
          </Grid>
        </Box>
      </StyledContainer>
    </>
  );
};

export default Login;
