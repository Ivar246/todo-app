import { Box, Stack, TextField, Typography } from "@mui/material";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { todosMock } from "../todos";
import TodoCard, { TodoCardProps } from "../components/TodoCard";
import TodoFilter from "../components/TodoFilter";

const Todos = () => {
  const [todos, setTodos] = useState<TodoCardProps[]>(todosMock);
  const [searchTerm, setSearchTerm] = useState("");

  // handle change in search field
  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    try {
      const res = await fetch(
        `http://localhost:3000/api/todos/search?q=${searchTerm}`
      );

      const data = await res.json();
      setTodos(data.todos);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // handling submit for search
  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/api/todos/search?q=${searchTerm}`
      );

      const data = await res.json();
      setTodos(data.todos);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/todos");
      const data = await res.json();
      if (!res.ok) throw new Error(data.messsage);
      setTodos(data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleFilter = (todos: []) => {
    setTodos(todos);
  };

  // search functionality
  return (
    <>
      <Box sx={{ p: 3, marginTop: "3rem" }}>
        {/* Search Box */}
        <Typography
          variant="subtitle2"
          sx={{ color: "text.secondary", opacity: 0.7, marginBottom: "0.5rem" }}
        >
          Search by title or description
        </Typography>
        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <TextField
            variant="outlined"
            placeholder="Search todos..."
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mb: 2 }}
          />
        </Box>

        {/* Filter and Sort Options */}
        <Typography
          variant="subtitle2"
          sx={{ color: "text.secondary", opacity: 0.7, marginBottom: "0.5rem" }}
        >
          Sorting and filtering
        </Typography>
        <TodoFilter onFilter={handleFilter} />

        <Box sx={{}}>
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
              <TodoCard key={todo.id} {...todo} />
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Todos;
