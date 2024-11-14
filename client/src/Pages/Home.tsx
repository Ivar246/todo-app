import { Box, Container, Typography } from "@mui/material";
import { todosMock } from "../todos";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import TodoCard from "../components/TodoCard";
import styled from "@emotion/styled";

const StyledContainer = styled(Container)({
  marginTop: "5rem",
  display: "flex",
  alignItems: "center",
});

const Home = () => {
  const [todos, setTodos] = useState(todosMock);
  return (
    <div>
      <StyledContainer>
        {todos.length === 0 ? (
          <p>no todos available</p>
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {todos.map((todo) => {
              return <TodoCard {...todo} />;
            })}
          </Grid>
        )}
      </StyledContainer>
    </div>
  );
};

export default Home;
