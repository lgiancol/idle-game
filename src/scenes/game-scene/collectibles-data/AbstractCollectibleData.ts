import GameManager from '../GameManager';
import ICollectibleData, { CollectibleType } from './ICollectibleData';

export default abstract class AbstractCollectibleData implements ICollectibleData {
  public gameManager: GameManager;
  public trueCount = 0;
  public count = 0;
  public isActive = false;

  public constructor(public type: CollectibleType, public collectSpeed: number, public clickSpeed: number, public buyPrice: number, public sellPrice: number) {}

  public update(deltaTime: number): void {
    this.updateCount(deltaTime / 1000);
  }

  private updateCount(deltaTimeCollect: number): void {
    this.trueCount += deltaTimeCollect * this.collectSpeed;

    this.count = Math.floor(this.trueCount);
  }

  private unlock() {
    this.gameManager.removeMoney(this.buyPrice);
    this.isActive = true;
  }

  public click(): void {
    if (this.isActive) {
      this.trueCount += this.clickSpeed;
      this.count = Math.floor(this.trueCount);
    } else {
      this.gameManager = GameManager.getInstance();
      if(this.gameManager.getMoney() >= this.buyPrice) {
        this.unlock();
      }
      this.gameManager = null;
    }
  }
}
