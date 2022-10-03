import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PostForm from "../Post/PostForm";

export default function FormDialog({
  open,
  handleOpen,
  eventDetails,
  alert,
  setEventsDetails,
  updateEvents,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleOpen}>
        <DialogTitle>Update Event</DialogTitle>
        <DialogContent>
          <PostForm
            eventDetails={eventDetails}
            setEventsDetails={setEventsDetails}
            handleSubmit={updateEvents}
            alert={alert}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
