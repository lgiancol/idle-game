import { CollectibleType } from "../../../../collectibles-data/ICollectibleData";
import AbstractSellIncreaseStoreItem from "../AbstractSellIncreaseStoreItem";

export default class KiloshmagiloItem extends AbstractSellIncreaseStoreItem {
    public constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        super(scene, x, y, width, height, 'Kilo Shmagilo', 1250, CollectibleType.KILOBYTE);
    }
}