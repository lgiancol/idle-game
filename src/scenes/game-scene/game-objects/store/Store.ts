import { GameObjects } from "phaser";
import { getGameHeight, getGameWidth } from "../../../../helpers";
import Text from "../../../../ui/Text";
import ICollectibleData from "../../collectibles-data/ICollectibleData";
import GameManager from "../../GameManager";
import AbstractCollectible from "../collectibles/AbstractCollectible";
import AbstractItemContainer from "./items/AbstractItemContainer";
import BitItemContainer from "./items/bit-items/BitItemContainer";
import ByteItemContainer from "./items/byte-items/ByteItemContainer";
import KilobyteItemContainer from "./items/kilobyte-items/KilobyteItemContainer";

export default class Store extends GameObjects.GameObject {
    private x = 100;
    private y: number;
    private height = 300;
    private width: number;

    private moneyLabel: Phaser.GameObjects.Text;
    private storeItemContainers: Phaser.GameObjects.Group;

    public constructor(scene: Phaser.Scene) {
        super(scene, "Store");
        this.width = getGameWidth(this.scene) - 200;

        this.init();
    }

    private init(): void {
        let gameManager = GameManager.getInstance();
        this.y = getGameHeight(this.scene) - 10 - this.height;

        // Rectangle outline
        let storeContainer = this.scene.add.rectangle(this.x, this.y, this.width, this.height);
        storeContainer.setOrigin(0, 0);
        storeContainer.isStroked = true;
        

        // Money
        this.moneyLabel = this.scene.add.existing(new Text(this.scene, storeContainer.x + 10, storeContainer.y + 10, `Money: ${gameManager.getMoney()}`));
        this.moneyLabel.setFontSize(20);
        this.moneyLabel.setFontStyle('bold');

        // Item containers
        this.storeItemContainers = this.scene.add.group({});
        this.storeItemContainers.runChildUpdate = true;
        
        let storeItemContainersArr = [
            new BitItemContainer(this.scene),
            new ByteItemContainer(this.scene),
            new KilobyteItemContainer(this.scene),
        ];
        let storeItemContainersWidth = this.width / storeItemContainersArr.length; // The number of store conatiners that we are going to add

        // Store Item Containers
        storeItemContainersArr.forEach((storeItemContainer: AbstractItemContainer, i: number) => {
            let last = i == storeItemContainersArr.length - 1;
            this.addNewStoreItemContainer(storeItemContainer, i, storeItemContainersWidth, last);
        });
    }

    private addNewStoreItemContainer(toAdd: AbstractItemContainer, storeIndex: number, storeItemContainersWidth: number, last: boolean) {
        let realWidth = storeItemContainersWidth - 10;
        toAdd.x = this.x + ((storeIndex + 1) * 10) + (realWidth * storeIndex);
        toAdd.y = this.y + 20 + this.moneyLabel.height;
        toAdd.width = last ? realWidth - 10 : realWidth;
        toAdd.height = 200;

        toAdd.init();

        this.storeItemContainers.add(toAdd);
    }

    public update(): void {
        super.update();

        this.moneyLabel.setText(`Money: ${GameManager.getInstance().getMoney()}`);
    }

}