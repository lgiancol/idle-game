import GameManager from "../../../GameManager";
import AbstractStoreItem from "./AbstractStoreItem";

export default abstract class AbstractCollectionSpeedStoreItem extends AbstractStoreItem {
    public purchaseItem(): void {
        GameManager.getInstance().removeMoney(this.cost);
        this.collectibleData.collectSpeed += 5;
        this.collectibleData.collectSpeed = Math.round((this.collectibleData.collectSpeed + Number.EPSILON) * 100) / 100;
    }

    public increaseCost(): void {
        this.cost = this.initialCost * Math.pow(1.5, this.level);
        this.cost = Math.round((this.cost + Number.EPSILON) * 100) / 100
    }
}