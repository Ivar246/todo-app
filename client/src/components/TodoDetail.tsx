// import {
//   Avatar,
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Typography,
// } from "@mui/material";

// const TodoDetail = ({ ...props }) => {
//   return (
//     <Dialog
//       open={props.open}
//       onClose={() => props.setOpen(false)}
//       fullWidth
//       maxWidth="sm"
//     >
//       <DialogTitle>Todo Details</DialogTitle>
//       <DialogContent>
//         {selectedTodo && (
//           <>
//             <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
//               <Avatar
//                 alt="Todo Image"
//                 src={selectedTodo.image}
//                 sx={{ width: 150, height: 150 }}
//               />
//             </Box>
//             <Typography variant="h6">{selectedTodo.title}</Typography>
//             <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
//               {selectedTodo.description}
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 1 }}>
//               <strong>Priority:</strong> {selectedTodo.priority}
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 1 }}>
//               <strong>Status:</strong> {selectedTodo.status}
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 1 }}>
//               <strong>Created by:</strong> {selectedTodo.user}
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 1 }}>
//               <strong>Created At:</strong> {selectedTodo.created_at}
//             </Typography>
//             <Typography variant="body1">
//               <strong>Due Date:</strong> {selectedTodo.dueDate}
//             </Typography>
//           </>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => setOpen(false)} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default TodoDetail;

// const [selectedTodo, setSelectedTodo] = useState<null | SelectedTodoState>({
//   title: "",
//   description: "",
//   dueDate: "",
//   status: "",
//   priority: "",
//   created_at: "",
// });

// interface SelectedTodoState {
//   id?: number | string;
//   title: string;
//   description: string;
//   dueDate: string;
//   status: string;
//   image?: string;
//   priority: string;
//   user?: any;
//   created_at: string;
// }
