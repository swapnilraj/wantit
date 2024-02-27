import React from "react";
// import { useBlock } from "@starknet-react/core";
import { Box, Button, Divider, Input, Stack, Typography } from "@mui/joy";
import { Event } from "./types";
import Dialog from "./components/ui/Dialog";
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { IdentityLink } from "./IdentityLink";


interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

// The pools props is an event
interface PoolProps {
    event: Event;
}

const NumericFormatAdapter = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatAdapter(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator
                valueIsNumericString
                prefix="$"
            />
        );
    },
);

// An eventpool is a collection of liquidity which can permissionlessly be added to.
// The event pool has an event attached to it and a list of addresses to which
// the pool will be distributed. The pool is distributed to the addresses when the event attached occurs.
// The pool has a value which can be made of any number of tokens.
// Users can add to the pool by clicking the "believe" button.
// The believe button pops up a modal which gives a short discription
function EventPool({ event }: PoolProps) {
    const [value, setValue] = React.useState('1320');
    const totalProportions = event.payouts.reduce((acc, payout) => acc + payout.proportion, 0);
    let resolutionStrategy;
    switch (event.resolutionStrategy.type) {
        case 'coordinator':
            resolutionStrategy =
                <Box>
                    <Typography>This event is managed by an unkown address. Please carefully check the legitimacy of the address.</Typography>
                    <Typography>Address: <IdentityLink identity={event.resolutionStrategy.coordinator} /></Typography>
                </Box>;
            break;
        case 'UMA':
            resolutionStrategy = <Box>
                <Typography>This event is managed by the UMA optimistic offchain oracle with a dispute resolution system. Disputes are resolved by the vote of the UMA DAO and protected by the UMA treasury.</Typography>
                <Typography>Please note, there is no specific address or SNID for UMA resolution as it is a decentralized process.</Typography>
            </Box>;
            break;
        case 'DAO':
            resolutionStrategy = <Box>
                <Typography>This event is managed by a DAO. The DAO is a contract controlled by a DAO vote.</Typography>
                <Typography>DAO Contract: <IdentityLink identity={event.resolutionStrategy.DAO} /></Typography>
            </Box>;
            break;
    }

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" className="px-4 py-2" sx={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', margin: '10px', backgroundColor: '#f9f9f9' }}>
            <Stack spacing={2}>
                <Box sx={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{event.title}</Box>
                <Box sx={{ fontSize: '16px', color: '#666' }}>{event.description}</Box>
                <Stack direction="row" spacing={3} alignItems="left">
                    <Box sx={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>${event.poolSize.value.toLocaleString()}</Box>
                    <Box sx={{ fontSize: '18px', color: '#666' }}>👤 {event.poolSize.quantity.toLocaleString()}</Box>
                </Stack>
            </Stack>
            <Dialog title="Believe">
                <Stack direction="column" spacing={2} justifyContent="space-between" alignItems="center" className="px-4 py-2">
                    <Box sx={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{event.title}</Box>
                    <Box sx={{ fontSize: '16px', color: '#666' }}>{event.description}</Box>
                    <Stack direction="row" spacing={3} alignItems="left">
                        <Box sx={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>${event.poolSize.value.toLocaleString()}</Box>
                        <Box sx={{ fontSize: '18px', color: '#666' }}>👤 {event.poolSize.quantity.toLocaleString()}</Box>
                    </Stack>
                    <Stack direction="row" spacing={3} alignItems="left">
                        <Input
                            value={value}
                            onChange={(event) => setValue(event.target.value)}
                            placeholder="Placeholder"
                            slotProps={{
                                input: {
                                    component: NumericFormatAdapter,
                                },
                            }}
                        />
                        <Button onClick={() => console.log("clicked")}>Send it</Button>
                    </Stack>
                    <Divider />
                    <Typography level="h4">Beneficiaries</Typography>
                    <Stack direction="row" spacing={3} alignItems="left">
                        {event.payouts.map((payout, index) => <Stack direction="row" key={index} spacing={3} alignItems="left">
                            <Stack direction="row" spacing={1} alignItems="left">
                                <IdentityLink identity={payout.identity} />
                                <Typography>{(payout.proportion / totalProportions * 100).toFixed(0) + "/100"}</Typography>
                            </Stack>
                        </Stack>
                        )}
                    </Stack>
                    <Divider />
                    <Typography level="h4">Pool Resolution Strategy</Typography>
                    <Stack direction="column" spacing={2} alignItems="left">
                        {resolutionStrategy}
                    </Stack>
                </Stack>
            </Dialog>

        </Stack>
    );
}


export default EventPool;
