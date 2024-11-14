import { Add } from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import TodoCard, { TodoCardProps } from "../components/TodoCard";
import Grid from "@mui/material/Grid2";
// import { experimentalStyled as styled } from "@mui/material/styles";
import { todosMock } from "../todos";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   ...theme.applyStyles("dark", {
//     backgroundColor: "#1A2027",
//   }),
// }));
const MyTodo = () => {
  const [showModel, setShowModel] = useState<Boolean>(false);
  const [myTodos, setMyTodos] = useState<TodoCardProps[]>(todosMock);

  const fetchTodos = async () => {
    console.log(myTodos);
  };
  useEffect(() => {
    fetchTodos();
  }, [myTodos]);

  const handleDelete = async () => {
    const res = await fetch("http://localhost:3000/");
  };
  return (
    <>
      <Container sx={{ marginTop: "5rem" }}>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => setShowModel(!showModel)}
          sx={{ textTransform: "none" }}
        >
          Add Task
        </Button>

        {myTodos.length === 0 ? (
          <p>no todos available</p>
        ) : (
          <Grid
            container
            spacing={{ xs: 2, md: 0 }}
            columns={{ xs: 2, sm: 3, md: 12 }}
          >
            {myTodos.map((todo, index) => (
              <Grid size={{ xs: 2, sm: 4, md: 4 }} key={index}>
                <TodoCard {...todo} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default MyTodo;
