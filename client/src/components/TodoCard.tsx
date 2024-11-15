import { Visibility } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { Priority, Status } from "../types";
import moment from "moment";
export interface TodoCardProps {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  status: Status;
  priority: Priority;
  user?: any;
  created_at?: string;
}

const TodoCard = ({ ...props }: TodoCardProps) => {
  return (
    <>
      <Card sx={{ width: "100%", mb: 1, padding: 1 }}>
        <CardContent sx={{ padding: "8px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Left side - Title and description */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="subtitle1"
                noWrap
                sx={{ fontSize: "0.9rem", fontWeight: "500" }}
              >
                {props.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                noWrap
                sx={{ fontSize: "0.8rem" }}
              >
                {props.description}
                2024-11-13ariant
              </Typography>

              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="caption" color="textSecondary" noWrap>
                  Created At:
                  <span style={{ opacity: "0.7", fontSize: "0.8rem" }}>
                    {" "}
                    {moment(props.created_at).format("YYYY-MM-DD")}
                  </span>
                </Typography>
                <Typography variant="caption" color="textSecondary" noWrap>
                  Duedate:
                  <span style={{ opacity: "0.7", fontSize: "0.8rem" }}>
                    {" "}
                    {moment(props.dueDate).format("YYYY-MM-DD")}
                  </span>
                </Typography>
              </div>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="subtitle2" color="textSecondary">
                <strong>Status:</strong>{" "}
                <span style={{ fontSize: "0.8rem", opacity: "0.9" }}>
                  {props.status}
                </span>
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                <strong>Priority:</strong>{" "}
                <span style={{ fontSize: "0.8rem", opacity: "0.9" }}>
                  {props.priority}
                </span>{" "}
              </Typography>
              <IconButton onClick={() => {}} aria-label="view" size="small">
                <Visibility fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default TodoCard;
