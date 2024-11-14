import { styled } from "@mui/material/styles";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
}));

const StyledContainer = styled(Container)({
  height: "90vh",
  width: "90vw",
  marginTop: "3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
interface SignupState {
  username: string;
  email: string;
  password: string;
}
const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupState>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <StyledContainer>
        <Box sx={{ padding: 3, border: "1px solid #ddd", borderRadius: "8px" }}>
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
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
              Sign Up
            </Button>
          </form>
          <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
            <Item>
              {""}
              <span>Already have an Account?</span>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                Log In
              </Link>
            </Item>
          </Grid>
        </Box>
      </StyledContainer>
    </>
  );
};

export default Signup;
