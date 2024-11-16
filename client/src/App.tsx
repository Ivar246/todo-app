import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./components/Header";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Todos from "./Pages/Todos";
import ProtectedRoute from "./components/ProtectedRoute";
import { Box } from "@mui/material";
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Box>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/todos" element={<Todos />}></Route>
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </>
  );
};

export default App;
