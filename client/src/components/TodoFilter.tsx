import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";

const TodoFilter = ({ ...props }) => {
  const [status, setStatus] = useState("");
  const [createdBefore, setCreatedBefore] = useState("");
  const [createdAfter, setCreatedAfter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value);
  };

  const handleSortDueDateChange = (e: SelectChangeEvent) => {
    setSortOrder(e.target.value);
  };

  const handleFilter = async () => {
    try {
      let query = "";
      if (sortOrder) query = query + `dueDateOrder=${sortOrder}`;
      if (status) query = query + `&status=${status}`;
      if (createdAfter) query = query + `&createdAfter=${createdAfter}`;
      if (createdBefore) query = query + `&createdBefore=${createdBefore}`;

      console.log(query);
      const res = await fetch(`http://localhost:3000/api/todos?${query}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      // lifting state up
      props.onFilter(data.todos);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Created Before"
            type="date"
            fullWidth
            name="createBefore"
            onChange={(e) => setCreatedBefore(e.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{ mb: 2, minWidth: 150 }}
          />

          <TextField
            label="Created After"
            type="date"
            fullWidth
            onChange={(e) => setCreatedAfter(e.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{ mb: 2, minWidth: 150 }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Status Filter */}
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              defaultValue=""
              onChange={handleStatusChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="COMPLETE">Complete</MenuItem>
              <MenuItem value="INCOMPLETE">Incomplete</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Sort by Due Date</InputLabel>
            <Select
              label="Sort by Due Date"
              defaultValue=""
              onChange={handleSortDueDateChange}
            >
              <MenuItem value="asc">
                <em>None</em>
              </MenuItem>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          sx={{ alignSelf: "flex-start", textTransform: "none" }}
          size="large"
          variant="contained"
          onClick={handleFilter}
        >
          Filter
        </Button>
      </Box>
    </>
  );
};

export default TodoFilter;
