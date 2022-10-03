import React, { useEffect, useState } from "react";
import PostForm from "./PostForm";

export default function Post() {
   const [eventDetails, setEventsDetails] = useState({
      name: "",
      place: "",
      address: "",
      time: "",
   });

   useEffect(() => {}, []);

   const handleSubmit = () => {};

   return (
      <PostForm
         eventDetails={eventDetails}
         setEventsDetails={setEventsDetails}
         handleSubmit={handleSubmit}
         alert={alert}
      />
   );
}
