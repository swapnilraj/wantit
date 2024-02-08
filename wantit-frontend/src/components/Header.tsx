import { useAccount, useDisconnect } from "@starknet-react/core";
import React from "react";
import ConnectModal from "./starknet/ConnectModal";
import { Stack } from "@mui/joy";

export default function Header() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Stack direction="row" justifyContent="flex-end" alignItems="center">
      {address ? (
        <div className="flex flex-col items-end bg-zinc-100 rounded-md px-6 py-2">
          <p className="font-semibold">{`${address.slice(
            0,
            6,
          )}...${address.slice(-4)}`}</p>
          <p
            onClick={() => disconnect()}
            className="cursor-pointer text-black/50"
          >
            Disconnect
          </p>
        </div>
      ) : (
        <ConnectModal />
      )}
    </Stack>
  );
}
