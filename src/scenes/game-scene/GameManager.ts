import Log from "./resources/log/Log";

export default class GameManager {

  private static instance: GameManager;

  // Resources
  public log: Log;

  public constructor() {}

  public static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }

    return GameManager.instance;
  }

  public createResources(scene: Phaser.Scene) {
	  this.log = this.createResource(scene);
  }

  private createResource(scene: Phaser.Scene) {
	  return null;
  }
}
