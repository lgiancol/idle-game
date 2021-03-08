import { CollectibleType } from "../../../../collectibles-data/ICollectibleData";
import AbstractCollectionSpeedStoreItem from "../AbstractCollectionSpeedStoreItem";

export default class KiloMeItem extends AbstractCollectionSpeedStoreItem{
    public constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        super(scene, x, y, width, height, 'Kilo-Me', 475, CollectibleType.KILOBYTE);
    }
}