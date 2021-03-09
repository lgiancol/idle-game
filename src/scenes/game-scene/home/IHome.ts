export default interface IHome {
    requiredEnergy: number; // The enerygy required per second to heat the home
    currentResourceCount: number; // The current number of resources in the home
    maxResourceCount: number; // The maximum number of resource the home can hold at once
}