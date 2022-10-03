import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import PostForm from "./PostForm";

export default function Post() {
  const [eventDetails, setEventsDetails] = useState({
    name: "",
    place: "",
    address: "",
    time: "",
  });
  const timerRef = useRef(null);
  const [alert, setAlert] = useState({
    visible: false,
    severity: "",
    message: "",
  });

  useEffect(() => {
    return clearTimeout(timerRef.current);
  }, []);

  const handleSubmit = () => {
    const collRef = collection(db, "Events");
    console.log(collRef, "collRef");
    addDoc(collRef, {
      name: eventDetails.name,
      address: eventDetails.address,
      place: eventDetails.place,
      time: eventDetails.time,
    })
      .then((result) => {
        console.log(result);
        setAlert({
          visible: true,
          severity: "success",
          message: "Event has been uploaded",
        });
        timerRef.current = setTimeout(() => {
          setAlert({ visible: false, severity: "", message: "" });
        }, 2000);
      })
      .catch((error) => {
        console.log(error.code, error.message);
        setAlert({ visible: true, severity: "error", message: error.message });

        timerRef.current = setTimeout(() => {
          setAlert({ visible: false, severity: "", message: "" });
        }, 2000);
      });
  };

  return (
    <PostForm
      eventDetails={eventDetails}
      setEventsDetails={setEventsDetails}
      handleSubmit={handleSubmit}
      alert={alert}
    />
  );
}
