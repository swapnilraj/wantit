import React, { useEffect, useState } from "react";
// import { useBlock } from "@starknet-react/core";
import { Sheet, Stack } from "@mui/joy";
import EventPool from "./EventPool";
import Header from "./components/Header";
import {  useProvider } from "@starknet-react/core";
import { POOL_CLASS_HASH } from "./consts";
import { Contract } from "./types";



function App() {
  const { provider } = useProvider();
  provider.getClassByHash(POOL_CLASS_HASH).then(console.log);
  // Store the result of the fetch in a state variable
  const [contractList, setContractList] = useState<string[]>([]);

  useEffect(() => {
    fetch(`https://goerli.voyager.online/api/class/${POOL_CLASS_HASH}/contracts?ps=10&p=1`).then((result) =>
      // Parse the JSON result and handle errors
      result.json().then((result) => {
        setContractList(result.items.map((contract: Contract) => contract.address));
      
  })
    );
    setInterval(() => {
      fetch(`https://goerli.voyager.online/api/class/${POOL_CLASS_HASH}/contracts?ps=10&p=1`).then((result) =>
        // Parse the JSON result and handle errors
        result.json().then((result) => {
          if (result.items !== contractList) setContractList(result.items.map((contract: Contract) => contract.address));
        })
      )
    }, 15000);
  }, []);



  const eventPools = contractList.map((contractAddress, index) => {
    return <EventPool key={index} contractAddress={contractAddress} />
  });


  return (
    <>
      <Header />
      <Sheet sx={{ width: '100%', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }} variant="solid">
        {/* <Header /> */}
        <Stack sx={{width: '100%', maxWidth: '1300px'}}>
          {eventPools}
        </Stack>
      </Sheet>
    </>
  );
}

export default App;
