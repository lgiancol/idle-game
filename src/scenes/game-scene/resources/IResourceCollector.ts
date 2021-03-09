import IResourceQuantity from "./IResourceQuantity";

export default interface IResourceCollector {
    resourceQuantity: IResourceQuantity; // The quantity of the resource in the collector
    collectSpeed: number; // The number of resources you can collect per second
    clickAmount: number; // The number of resource you can collect per click
}