import { Box } from "@mui/system";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CustomCard from "../../Components/Cards/customCard";
import { db } from "../../firebase";
import FormDialog from "./FormDialog";

export default function Dashboard() {
  const [eventData, setEventData] = useState([]);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = React.useState({
    visible: false,
    severity: "",
    message: "",
  });
  const [eventDetails, setEventsDetails] = React.useState({
    name: "",
    place: "",
    address: "",
    time: "",
  });

  useEffect(() => {
    const collRef = collection(db, "Events");
    const unsubs = onSnapshot(collRef, (querySnapshot) => {
      const data = querySnapshot.docs.map((query) => {
        return { ...query.data(), id: query.id };
      });
      setEventData(data);
    });
    return unsubs;
    // getDocs(collRef).then((querySnapshot) => {
    //    querySnapshot.forEach(query => {
    //     console.log("query is", query.data(), query.id)
    //     data.push({...query.data(),id:query.id})
    //   })
    //   console.log("data",data)
    //   setEventData(data);
    //})
  }, []);

  const deleteEvents = (id) => {
    console.log(id);
    deleteDoc(doc(db, "Events", id))
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateEvents = () => {
    console.log(eventDetails);
    const docRef = doc(db, "Events", eventDetails.id);
    updateDoc(docRef, {
      name: eventDetails.name,
      address: eventDetails.address,
      place: eventDetails.place,
      time: eventDetails.time,
    })
      .then(() => {
        console.log("successful");
      })
      .catch((error) => console.log(error));
  };

  const updateDialog = (id) => {
    setOpen(true);
    const event = eventData.find((event) => event.id === id);
    console.log(event);
    setEventsDetails(event);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexFlow: "wrap",
        }}
      >
        {eventData.map((detail) => {
          return (
            <CustomCard
              details={detail}
              key={detail.id}
              deleteEvents={deleteEvents}
              updateEvents={updateDialog}
            />
          );
        })}
        <FormDialog
          open={open}
          handleOpen={() => setOpen(!open)}
          eventDetails={eventDetails}
          alert={alert}
          updateEvents={updateEvents}
          setEventsDetails={setEventsDetails}
        />
      </Box>
    </>
  );
}
