import { getGameHeight } from "../../helpers";
import GameManager from "./GameManager";
import Camp from "./home/camp/Camp";
import Home from "./home/Home";
import Hut from "./home/hut/Hut";
import Tent from "./home/tent/Tent";
import Log from "./resources/log/Log";
import Resource from "./resources/Resource";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {

  private resources: Resource[];
  private homes: Home[];

  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    GameManager.getInstance().currentScene = this;
    this.createInitialHomes();

    this.createResources();

    // Since the component of the Home relies on the resources being created and setup, we need to call this at the end
    this.homes.forEach((home) => home.initializeComponent());
  }

  private createInitialHomes() {
    this.homes = [] as Home[];


    let home = new Camp();
    home.x = 100;
    home.y = getGameHeight(this) - 10 - 200;
    home.width = 200;
    home.height = 200;

    this.homes.push(home);

    home = new Tent();
    home.x = 100 + 10 + 200;
    home.y = getGameHeight(this) - 10 - 200;
    home.width = 200;
    home.height = 200;

    this.homes.push(home);

    home = new Hut();
    home.x = 100 + 10 + 200 + 10 + 200;
    home.y = getGameHeight(this) - 10 - 200;
    home.width = 200;
    home.height = 200;

    this.homes.push(home);
  }

  private createResources() {
    this.resources = [];

    this.addResource(0, new Log());
  }

  private addResource(index: number, toAdd: Resource) {
    this.homes.forEach((home) => {
      if(home.usesResourceAsFuel(toAdd)) {
        home.setFuelResource(toAdd);
      }
    });

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
    this.homes.forEach((home) => {
      home.update(delta);
    });
  }
}
