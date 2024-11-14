import { Container } from "@mui/material";
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
const Todos = () => {
  const [todos, setTodos] = useState<TodoCardProps[]>(todosMock);

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/todo/todos");
      const data = await res.json();
      if (!res.ok) throw new Error(data.messsage);

      setTodos(data.todos);
      console.log(todos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [todos]);

  // search functionality
  return (
    <>
      <Container>
        {todos.length === 0 ? (
          <p>no todos available</p>
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {todos.map((todo) => {
              return <TodoCard {...todo} />;
            })}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Todos;
