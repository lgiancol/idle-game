import Resource from "../resources/Resource";

export default interface IHome {
    fuelUsageSpeed: number; // The fuel required per second to heat the home
    currentResourceCount: number; // The current number of resources in the home
    maxResourceCount: number; // The maximum number of resource the home can hold at once
    fuelResource: Resource; // The fuel Resource the home accepts
}