"use client";
import { Connector, useConnect } from "@starknet-react/core";
import React from "react";
import { Button } from "../ui/Button";
import Dialog from "../ui/Dialog";
import { Stack, Typography } from "@mui/joy";

export default function ConnectModal() {
  const { connect, connectors } = useConnect();

  return (

    <Dialog title="Connect Wallet" buttonTitle="ConnectWallet">
      <Stack justifyContent="center" alignItems="center" spacing={1}>
        {connectors.map((connector: Connector) => {
          return (
            <Button
              key={connector.id}
              onClick={async () =>
                connector.available() ? connect({ connector }) : null
              }
              disabled={!connector.available()}
              className="flex flex-row items-center justify-start gap-4 w-96"
            >
              {connector.icon.light && (
                <img src={connector.icon.dark} className="w-10 h-10" />
              )}
              <Typography sx={{color: "white"}}> Connect {connector.name}</Typography>
            </Button>
          );
        })}
      </Stack>
    </Dialog>
  );
}
