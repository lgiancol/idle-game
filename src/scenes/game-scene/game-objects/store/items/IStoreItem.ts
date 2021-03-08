import AbstractCollectibleData from "../../../collectibles-data/AbstractCollectibleData";

export default interface IStoreItem {
    name: string;
    description: string;
    cost: number;
    costIncreaseFn: (level: number) => number;
    collectibleData: AbstractCollectibleData;
    level: number;
    purchaseItem: () => void;
}