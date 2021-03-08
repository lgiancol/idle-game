import { GameObjects } from "phaser";

export default abstract class AbstractItemContainer extends GameObjects.GameObject {
    protected storeItems: Phaser.GameObjects.Group;
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public constructor(scene: Phaser.Scene) {
        super(scene, 'ItemContainer');
    }

    public abstract init(): void;
}