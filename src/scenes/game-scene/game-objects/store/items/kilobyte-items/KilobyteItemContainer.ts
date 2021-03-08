import AbstractItemContainer from "../AbstractItemContainer";
import KiloMeItem from "./KillOMeItem";
import KiloshmagiloItem from "./KiloShmagiloItem";

export default class KilobyteItemContainer extends AbstractItemContainer {
    public constructor(scene: Phaser.Scene) {
        super(scene);
    }

    public init(): void {
        this.storeItems = this.scene.add.group({});
        this.storeItems.runChildUpdate = true;

        this.storeItems.add(new KiloMeItem(this.scene, this.x + 10, this.y + 10, this.width - 20, 50));
        this.storeItems.add(new KiloshmagiloItem(this.scene, this.x + 10, this.y + 70, this.width - 20, 50));
    }
}