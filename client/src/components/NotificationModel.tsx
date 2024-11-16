import { Modal, Box, IconButton, Typography } from "@mui/material";
import { Close, NotificationAdd } from "@mui/icons-material";

interface NotificationModelProps {
  message: string;
  showNotification: boolean;
  onNotificationClose: () => void;
}

const NotificationModel = ({
  message,
  showNotification,
  onNotificationClose,
}: NotificationModelProps) => {
  const handleClose = () => {
    onNotificationClose();
  };

  return (
    <Modal open={showNotification}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          border: "2px solid #1976d2",
          boxShadow: 24,
          p: 2,
          borderRadius: "8px",
        }}
      >
        {/* Close Icon Button */}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: -3, right: 2 }}
          aria-label="close"
        >
          <Close sx={{ fontSize: "1.3rem" }} />
        </IconButton>

        <Typography variant="h6" component="h2" sx={{ mb: 2 }} color="primary">
          Notification{" "}
          <span>
            <NotificationAdd />
          </span>
        </Typography>
        <Typography variant="subtitle2" sx={{ opacity: "0.8" }}>
          {message}
        </Typography>
      </Box>
    </Modal>
  );
};

export default NotificationModel;
