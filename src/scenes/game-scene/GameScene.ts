import { getGameHeight } from "../../helpers";
import GameManager from "./GameManager";
import Camp from "./home/Camp";
import Home from "./home/Home";
import Log from "./resources/log/Log";
import Resource from "./resources/Resource";
import ResourceCollector from "./resources/ResourceCollector";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {

  private resources: Resource[];
  private home: Home;

  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    GameManager.getInstance().currentScene = this;
    this.createInitialHome();

    this.createResources();

    // Since the component of the Home relies on the resources being created and setup, we need to call this at the end
    this.home.initializeComponent();
  }

  private createInitialHome() {
    this.home = new Camp();
    this.home.x = 100;
    this.home.y = getGameHeight(this) - 10 - 200;
    this.home.width = 200;
    this.home.height = 200;
  }

  private createResources() {
    this.resources = [];

    this.addResource(0, new Log());
  }

  private addResource(index: number, toAdd: Resource) {
    if(this.home.usesResourceAsFuel(toAdd)) {
      this.home.addAcceptableResource(toAdd);
    }

    // Set up the positioning of the collector
    toAdd.resourceCollector.x = 100 + (index * 100) + (index * 10);
    toAdd.resourceCollector.y = 100;
    toAdd.resourceCollector.width = 100;
    toAdd.resourceCollector.height = 100;
    toAdd.resourceCollector.initializeComponent();

    this.resources.push(toAdd);
  }

  public update(time: number, delta: number): void {
    this.resources.forEach(
      (resource: Resource) => resource.update(delta)
    );
    this.home.update(delta);
  }
}
