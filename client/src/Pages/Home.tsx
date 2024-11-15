import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { todosMock } from "../todos";
import { useEffect, useState } from "react";

const Home = () => {
  const [todos, setTodos] = useState(todosMock);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("http://localhost:3000/api/todos");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTodos(data.todos);
    };

    fetchTodos();
  }, [todos]);
  return (
    <Box sx={{ padding: 4, marginTop: "5rem" }}>
      <Typography
        variant="subtitle2"
        sx={{ opacity: "0.7", fontWeight: "bold" }}
        gutterBottom
      >
        All Todos
      </Typography>
      <hr />
      {/* for listing todo */}
      <Stack spacing={2} sx={{ marginTop: "2rem" }}>
        {todos.map((todo) => (
          <Card key={todo.id} sx={{ width: "100%", height: "5rem" }}>
            <CardContent>
              <Typography variant="body1">{todo.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {todo.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Home;
