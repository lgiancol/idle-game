import { ByteComponent } from "../../../collectibles/ByteComponent";
import AbstractItemContainer from "../AbstractItemContainer";
import ByterItem from "./ByteerItem";
import ByteMeItem from "./ByteMeItem";

export default class ByteItemContainer extends AbstractItemContainer {
    public constructor(scene: Phaser.Scene) {
        super(scene);
    }

    public init(): void {
        this.storeItems = this.scene.add.group({});
        this.storeItems.runChildUpdate = true;

        this.storeItems.add(new ByteMeItem(this.scene, this.x + 10, this.y + 10, this.width - 20, 50));
        this.storeItems.add(new ByterItem(this.scene, this.x + 10, this.y + 70, this.width - 20, 50));
    }
}