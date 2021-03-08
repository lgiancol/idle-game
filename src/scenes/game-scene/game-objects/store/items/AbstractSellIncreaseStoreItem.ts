import GameManager from "../../../GameManager";
import AbstractStoreItem from "./AbstractStoreItem";

export default abstract class AbstractSellIncreaseStoreItem extends AbstractStoreItem {
    public purchaseItem(): void {
        GameManager.getInstance().removeMoney(this.cost);
        this.collectibleData.sellPrice += 0.75;
        this.collectibleData.sellPrice = Math.round((this.collectibleData.sellPrice + Number.EPSILON) * 100) / 100;
    }

    public increaseCost(): void {
        this.cost = this.initialCost * Math.pow(1.75, this.level);    
        this.cost = Math.round((this.cost + Number.EPSILON) * 100) / 100
    }
}