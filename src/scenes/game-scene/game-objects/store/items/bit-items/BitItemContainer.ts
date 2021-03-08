import AbstractItemContainer from "../AbstractItemContainer";
import BitCrusherItem from "./BitCrusherItem";
import BitnamiItem from "./BitnamiItem";

export default class BitItemContainer extends AbstractItemContainer {
    public constructor(scene: Phaser.Scene) {
        super(scene);
    }

    public init(): void {
        this.storeItems = this.scene.add.group({});
        this.storeItems.runChildUpdate = true;

        this.storeItems.add(new BitCrusherItem(this.scene, this.x + 10, this.y + 10, this.width - 20, 50));
        this.storeItems.add(new BitnamiItem(this.scene, this.x + 10, this.y + 10 + 50 + 10, this.width - 20, 50));
    }
}