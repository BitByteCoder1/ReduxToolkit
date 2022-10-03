import React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import AlertBox from "../../Components/Alert/alert";

export default function PostForm({
  eventDetails,
  setEventsDetails,
  handleSubmit,
  alert,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "50%",
      }}
    >
      <AlertBox
        visible={alert.visible}
        severity={alert.severity}
        message={alert.message}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="Name of Event"
            fullWidth
            required
            id="Name"
            label="Name of Event"
            value={eventDetails.name}
            onChange={(event) =>
              setEventsDetails({ ...eventDetails, name: event.target.value })
            }
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="Place of Event"
            fullWidth
            required
            id="place"
            label="Place of Event"
            value={eventDetails.place}
            onChange={(event) =>
              setEventsDetails({ ...eventDetails, place: event.target.value })
            }
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="Complete Address"
            fullWidth
            required
            id="Address"
            label="Complete Address"
            value={eventDetails.address}
            onChange={(event) =>
              setEventsDetails({ ...eventDetails, address: event.target.value })
            }
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="Time of Event"
            fullWidth
            required
            id="time"
            label="Time of Event"
            value={eventDetails.time}
            onChange={(event) =>
              setEventsDetails({ ...eventDetails, time: event.target.value })
            }
            autoFocus
          />
        </Grid>
      </Grid>
      <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
        submit
      </Button>
    </Box>
  );
}
