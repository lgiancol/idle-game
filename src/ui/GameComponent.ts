import { GameObjects } from "phaser";
import GameManager from "../scenes/game-scene/GameManager";

export default abstract class GameComponent extends GameObjects.GameObject {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public constructor(tag: string) {
        super(GameManager.getInstance().currentScene, tag);
    }

    public abstract initializeComponent();
}