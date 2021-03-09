import GameManager from "./GameManager";
import LogCollector from "./resources/log/LogCollector";
import Resource from "./resources/Resource";
import ResourceCollector from "./resources/ResourceCollector";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {

  private resourceCollectors: ResourceCollector<Resource>[];

  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    GameManager.getInstance().currentScene = this;

    this.resourceCollectors = [];

    this.addResourceCollector(0, new LogCollector());
    this.addResourceCollector(1, new LogCollector());
    this.addResourceCollector(2, new LogCollector());
  }

  private addResourceCollector(index: number, toAdd: ResourceCollector<Resource>) {
    toAdd.x = 100 + (index * 100) + (index * 10);
    toAdd.y = 100;
    toAdd.width = 100;
    toAdd.height = 100;
    toAdd.initializeComponent();

    this.resourceCollectors.push(toAdd);
  }

  public update(time: number, delta: number): void {
    this.resourceCollectors.forEach(
      (resourceCollector: ResourceCollector<Resource>) => resourceCollector.update(delta)
    );
    
  }
}
