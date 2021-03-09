export default interface IResourceCollector {
    quantity: number; // The number of the specific resource currently held
    collectSpeed: number; // The number of resources you can collect per second
    clickAmount: number; // The number of resource you can collect per click
}