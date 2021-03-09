export default class GameManager {

  private static instance: GameManager;
  public currentScene: Phaser.Scene;

  public constructor() {}

  public static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }

    return GameManager.instance;
  }
}
