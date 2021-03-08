import AbstractCollectibleData from './collectibles-data/AbstractCollectibleData';
import BitData from './collectibles-data/BitData';
import ByteData from './collectibles-data/ByteData';
import ICollectibleData, { CollectibleType } from './collectibles-data/ICollectibleData';
import KiloByteData from './collectibles-data/KiloByteData';

export default class GameManager {
  private static instance: GameManager;
  private collectiblesData: ICollectibleData[];
  private money: number;

  public constructor() {
    this.collectiblesData = [];
    this.collectiblesData.push(new BitData());
    this.collectiblesData.push(new ByteData());
    this.collectiblesData.push(new KiloByteData());

    this.money = 0;
  }

  public static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }

    return GameManager.instance;
  }

  public getMoney(): number {
    return this.money;
  }

  public addMoney(toAdd: number): void {
    this.money += toAdd;
    this.money = Math.round((this.money + Number.EPSILON) * 100) / 100;
  }

  public removeMoney(toRemove: number): void {
    if(toRemove <= this.money) {
      this.money -= toRemove;
      this.money = Math.round((this.money + Number.EPSILON) * 100) / 100;
    }
  }

  public getCollectibleData<T extends AbstractCollectibleData>(type: CollectibleType): T {
    return this.collectiblesData[type] as T;
  }

  public update(delta: number): void {
    this.collectiblesData.forEach((item: ICollectibleData) => {
      if (item.isActive) {
        item.update(delta);
      }
    });
  }
}
