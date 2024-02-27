import React from "react";
import { Link } from "@mui/joy";
import { Identity } from "./types";

interface IdentityLinkProps {
    identity: Identity;
}

export const IdentityLink: React.FC<IdentityLinkProps> = ({ identity }) => (
    <Link href={`https://goerli.voyager.online/contract/${identity.address}`}>
        {identity.snid || identity.address}
    </Link>
);
