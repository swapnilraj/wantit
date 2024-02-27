import { useAccount, useDisconnect, useNetwork } from "@starknet-react/core";
import React from "react";
import ConnectModal from "./starknet/ConnectModal";
import { Stack, Typography } from "@mui/joy";

export default function Header() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%', background: 'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)' }}>
      {address && (
        <Typography sx={{ ml: 2, color: 'red', fontWeight: 'bold', fontSize: '1rem' }}>
          {chain ? `${chain.name}` : ''}
        </Typography>
      )}
      <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ pr: 2 }}>
        {address ? (
          <div className="flex flex-col items-end bg-[#41295a] bg-[linear-gradient(315deg,#41295a 0%,#2f0743 74%)] rounded-md px-6 py-2">
            <p className="font-semibold text-[#00dbde]">{`${address.slice(
              0,
              6,
            )}...${address.slice(-4)}`}</p>
            <p
              onClick={() => disconnect()}
              className="cursor-pointer text-[#ff4e00]/75 hover:text-[#ff4e00]"
            >
              Disconnect
            </p>
          </div>
        ) : (
          <ConnectModal />
        )}
      </Stack>
    </Stack>
  );
}

