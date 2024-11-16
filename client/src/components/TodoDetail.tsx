import { Box, Button, Typography } from "@mui/material";
import { Modal } from "@mui/material";

interface TodoDetailProps {
  id?: number | string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  imageUrl?: string;
  priority: string;
  created_at?: string;
  user?: {
    id: number;
    username: string;
  };
  open: boolean;
  handleClose: () => void;
}
const modalStyle = {
  height: "90vh",

  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 600,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
const TodoDetail = ({ ...props }: TodoDetailProps) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={modalStyle}>
        <Box
          sx={{ display: "flex", justifyContent: "center", height: "10rem" }}
        >
          <img
            src={props.imageUrl || "./assets/images/defaultTodo.png"}
            alt="Todo image"
          />
        </Box>
        <Typography variant="h5" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {props.description}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Priority:</strong> {props.priority}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Status:</strong> {props.status}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Created by:</strong> {props.user?.username}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Created At:</strong> {props.created_at}
        </Typography>
        <Typography variant="body1">
          <strong>Due Date:</strong> {props.dueDate}
        </Typography>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleClose}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TodoDetail;
