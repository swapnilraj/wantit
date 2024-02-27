import { Event } from "../types";

const eventpools : Event[] = [
    {
        title: "Mark vs Elon boxing match",
        description: "Are you mad you didn't get to see this? Let's see if we can get their attention.",
        expiery: 12345678,
        payouts: [
            { identity: { address: "0x123", ens: "mark.eth" }, proportion: 50 },
            { identity: { address: "0x456", ens: "elon.eth" }, proportion: 50 }
        ],
        poolSize: { value: 345245223452, quantity: 23423425 },
        resolutionStrategy: { type: "coordinator", coordinator: "0x789" }
    },
    {
        title: "Rolling Stones, London 2024!",
        description: "We will get them back together!",
        expiery: 23456789,
        payouts: [
            { identity: { address: "0x789", ens: "mickjagger.eth" }, proportion: 25 },
            { identity: { address: "0xabc", ens: "keithrichards.eth" }, proportion: 25 },
            { identity: { address: "0xdef", ens: "ronwood.eth" }, proportion: 25 },
            { identity: { address: "0xghi", ens: "charliewatts.eth" }, proportion: 25 }
        ],
        poolSize: { value: 234235234, quantity: 9803 },
        resolutionStrategy: { type: "coordinator", coordinator: "0x789" }
    },
]

export default eventpools;