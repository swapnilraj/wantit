import React from "react";
// import { useBlock } from "@starknet-react/core";
import { Sheet, Stack } from "@mui/joy";
import EventPool from "./EventPool";
import dummyEvents from "./dummy/eventpools";
import Header from "./components/Header";

function App() {
  const eventPools = dummyEvents.map((event, index) => {
    return <EventPool key={index} event={event} />
  });
  return (
    <>
    <Header />
    <Sheet sx={{width: '100%', heigh: '100%'}} variant="solid">
      {/* <Header /> */}
      <Stack>
        {eventPools}
      </Stack>
    </Sheet>
    </>
  );
}

export default App;
