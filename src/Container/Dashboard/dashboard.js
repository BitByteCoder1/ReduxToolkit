import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CustomCard from "../../Components/Cards/customCard";

const eventData = [
   {
      id: 1,
      address: "Bandra",
      name: "Dance",
      place: "Mumbai",
      time: "7:00pm",
   },
];

export default function Dashboard() {
   useEffect(() => {}, []);

   const deleteEvents = (id) => {};

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
            {eventData &&
               eventData.map((detail) => {
                  return (
                     <CustomCard details={detail} key={detail.id} deleteEvents={deleteEvents} />
                  );
               })}
         </Box>
      </>
   );
}
