import { getGameHeight, getGameWidth } from "../../helpers";
import ResourceCollectionZone from "./components/resource-collection-zones/ResourceCollectionZone";
import ZoneComponent from "./components/ZoneComponent";
import GameManager from "./GameManager";
import Camp from "./home/camp/Camp";
import Home from "./home/Home";
import Hut from "./home/hut/Hut";
import Tent from "./home/tent/Tent";
import Log from "./resources/log/Log";
import LogCollector from "./resources/log/LogCollector";
import Resource from "./resources/Resource";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {

  private resources: Resource[];
  private zoneComponents: {[zoneName: string]: ZoneComponent<any>};
  private home: Home;

  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    GameManager.getInstance().currentScene = this;

    this.createInitialHome();
    this.createZones();

    this.createResources();

    // Since the component of the Home relies on the resources being created and setup, we need to call this at the end
    this.home.initializeComponent();
    Object.keys(this.zoneComponents).forEach((zoneName: string) => {
      this.zoneComponents[zoneName].initializeComponent();
    });
  }

  private createInitialHome() {
    // TODO: Maybe make these within the specific home class itself?
    let homeWidth = 200;
    let homeHeight = 200;

    this.home = new Camp();
    this.home.x = (getGameWidth(this) / 2) - (homeWidth / 2);
    this.home.y = (getGameHeight(this) / 2) - (homeHeight / 2);
    this.home.width = homeWidth;
    this.home.height = homeHeight;
  }

  private createZones() {
    this.zoneComponents = {
      'resourceCollection': new ResourceCollectionZone(),
      'resourceRefining': new ResourceCollectionZone(),
      'resourceMarket': new ResourceCollectionZone(),
      'dunno': new ResourceCollectionZone()
    } as {[zoneName: string]: ZoneComponent<any>};

    // Set up the positioning of the zones
    const zoneWidth = ((getGameWidth(this) - 20) / 2) - (this.home.width / 2) - 10;
    const zoneHeight = (getGameHeight(this) - 20) / 2;
    // TOP LEFT
    this.zoneComponents['resourceCollection'].x = 10;
    this.zoneComponents['resourceCollection'].y = 10;
    this.zoneComponents['resourceCollection'].width = zoneWidth;
    this.zoneComponents['resourceCollection'].height = zoneHeight

    // TOP RIGHT
    this.zoneComponents['resourceRefining'].x = getGameWidth(this) - zoneWidth - 10;
    this.zoneComponents['resourceRefining'].y = 10;
    this.zoneComponents['resourceRefining'].width = ((getGameWidth(this) - 20) / 2) - (this.home.width / 2) - 10;
    this.zoneComponents['resourceRefining'].height = zoneHeight;

    // BOTTOM RIGHT
    this.zoneComponents['resourceMarket'].x = getGameWidth(this) - zoneWidth - 10;
    this.zoneComponents['resourceMarket'].y = getGameHeight(this) - zoneHeight;
    this.zoneComponents['resourceMarket'].width = ((getGameWidth(this) - 20) / 2) - (this.home.width / 2) - 10;
    this.zoneComponents['resourceMarket'].height = zoneHeight - 10;
    
    // BOTTOM LEFT
    this.zoneComponents['dunno'].x = 10;
    this.zoneComponents['dunno'].y = getGameHeight(this) - zoneHeight;
    this.zoneComponents['dunno'].width = ((getGameWidth(this) - 20) / 2) - (this.home.width / 2) - 10;
    this.zoneComponents['dunno'].height = zoneHeight - 10;
  }

  private createResources() {
    this.resources = [];

    // Logs
    let resource: Resource = new Log();
    this.addResource(0, resource);

    this.zoneComponents['resourceCollection'].addToZone(resource.resourceCollector);
  }

  private addResource(index: number, toAdd: Resource) {
    this.home.setFuelResource(toAdd);
    this.resources.push(toAdd);
  }

  public update(time: number, delta: number): void {
    Object.keys(this.zoneComponents).forEach(
      (zoneName: string) => this.zoneComponents[zoneName].update(delta)
    );
    this.home.update(delta);
  }
}
