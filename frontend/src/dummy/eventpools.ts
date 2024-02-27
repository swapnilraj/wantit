import { Event } from "../types";

const eventpools : Event[] = [
    {
        title: "Mark vs Elon boxing match",
        description: "Are you mad you didn't get to see this? Let's see if we can get their attention.",
        expiery: 12345678,
        payouts: [
            { identity: { address: "0x123", snid: "mark.strk" }, proportion: 50 },
            { identity: { address: "0x456", snid: "elon.strk" }, proportion: 50 }
        ],
        poolSize: { value: 345245223452, quantity: 23423425 },
        resolutionStrategy: { type: "coordinator", coordinator: {address: "0x789"} }
    },
    {
        title: "Rolling Stones, London 2024!",
        description: "We will get them back togstrker!",
        expiery: 23456789,
        payouts: [
            { identity: { address: "0x789", snid: "mickjagger.strk" }, proportion: 25 },
            { identity: { address: "0xabc", snid: "keithrichards.strk" }, proportion: 25 },
            { identity: { address: "0xdef", snid: "ronwood.strk" }, proportion: 25 },
            { identity: { address: "0xghi", snid: "charliewatts.strk" }, proportion: 25 }
        ],
        poolSize: { value: 234235234, quantity: 9803 },
        resolutionStrategy: { type: "coordinator", coordinator: {address: "0x789", snid: "resolutions.strk" }}
    },
]

export default eventpools;