import { CollectibleType } from "../../../../collectibles-data/ICollectibleData";
import AbstractCollectionSpeedStoreItem from "../AbstractCollectionSpeedStoreItem";

export default class BitCrusherItem extends AbstractCollectionSpeedStoreItem {
    public constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        super(scene, x, y, width, height, 'BitCrusher', 50, CollectibleType.BIT);
    }
}