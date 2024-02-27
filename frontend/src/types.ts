// An Identity is an onchain identifier and a potential ens name.
export type Identity = { address: string; ens?: string };

// A PoolSize is a value in dollars and a quantity of participant addresses
export type PoolSize = { value: number; quantity: number };

// A resolution strategy is one of "coordinator", "UMA", or "DAO"
// This is made with a discriminated union
export type ResolutionStrategy = CoordinatorResolutionStrategy | UMAResolutionStrategy | DAOResolutionStrategy;

// A CoordinatorResolutionStrategy is simply a coordinator address
export type CoordinatorResolutionStrategy = { type: "coordinator"; coordinator: string };

// A UMAResolutionStrategy is an empty type
export type UMAResolutionStrategy = { type: "UMA" };

// A DAOResolutionStrategy is a DAO address
export type DAOResolutionStrategy = { type: "DAO"; DAO: string };

// An event is a title, a description, an optional expiery block, a list of addresses and proportions, a PoolSize, and a ResolutionStrategy
export interface Event {
    title: string;
    description: string;
    expiery?: number;
    payouts: { identity: Identity, proportion: number}[];
    poolSize: PoolSize;
    resolutionStrategy: ResolutionStrategy;
}