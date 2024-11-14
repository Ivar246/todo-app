import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./components/Header";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Todos from "./Pages/Todos";
import MyTodo from "./Pages/MyTodo";
import ProtectedRoute from "./components/ProtectedRoute";
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/todos" element={<Todos />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/mytodo" element={<MyTodo />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
