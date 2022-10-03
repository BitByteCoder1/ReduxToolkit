import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CustomCard({ details, deleteEvents, updateEvents }) {
   const { name, address, place, time, id } = details;
   return (
      <Card sx={{ width: "20%", margin: "15px" }} variant="outlined">
         <CardContent>
            <Typography variant="h5" component="div">
               {name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
               {time}
            </Typography>
            <Typography variant="body2">
               {address}
               <br />
               {place}
            </Typography>
         </CardContent>
         <CardActions>
            <Button size="small" onClick={() => deleteEvents(id)}>
               Delete
            </Button>
         </CardActions>
      </Card>
   );
}
