import IResourceCollector from "./IResourceCollector";
import IResourceQuantity from "./IResourceQuantity";

export interface IResource {
    name: string; // The name of this resource
    sellPrice: number; // The price to sell the resource
    resourceCollector: IResourceCollector; // The collector used for this resource
}

export interface IBuyableResource extends IResource {
    cost: number; // The price to buy the resource (one time thing)
}

export interface IBurnableResource extends IResource {
    burnDuration: number; // The number of seconds this resource will burn for
}