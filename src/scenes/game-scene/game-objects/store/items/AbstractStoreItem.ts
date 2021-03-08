import { GameObjects } from "phaser";
import { GameButton } from "../../../../../ui/GameButton";
import StoreUtils from "../../../../../utils/StoreUtils";
import AbstractCollectibleData from "../../../collectibles-data/AbstractCollectibleData";
import { CollectibleType } from "../../../collectibles-data/ICollectibleData";
import GameManager from "../../../GameManager";
import IStoreItem from "./IStoreItem";

export default abstract class AbstractStoreItem extends GameObjects.GameObject implements IStoreItem{
    public collectibleData: AbstractCollectibleData;
    protected initialCost: number;
    public costIncreaseFn = StoreUtils.exponentialFn();
    public description: string;
    public buyButton: GameButton;
    public level = 1;
    
    public constructor(scene: Phaser.Scene, public x: number, public y: number, public width: number, public height: number, public name: string, public cost: number, collectibleType: CollectibleType) {
        super(scene, 'StoreItem');

        this.initialCost = this.cost;
        this.collectibleData = GameManager.getInstance().getCollectibleData(collectibleType);

        this.init();
    }

    private init() {        
        this.buyButton = new GameButton(this.scene, this.x, this.y, this.width, this.height, `${this.name} ($${this.cost})`, this.click.bind(this));
    }

    private click(): void {
        this.level++;
        this.purchaseItem();
        this.increaseCost();
    }

    public update(): void {
        super.update();

        this.buyButton.setEnabled(this.collectibleData.isActive && GameManager.getInstance().getMoney() >= this.cost);
        this.buyButton.setLabel(`${this.name} ($${this.cost})`);
    }

    public abstract purchaseItem();
    public abstract increaseCost();
}
