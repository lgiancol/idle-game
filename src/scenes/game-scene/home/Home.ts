import { GameObjects } from "phaser";
import GameComponent from "../../../ui/GameComponent";
import Text from "../../../ui/Text";
import Resource from "../resources/Resource";
import FuelUsage from "./FuelUsage";
import IFuelResource from "./IFuelResource";
import IHome from "./IHome";
import TakeResourceButton from "./TakeResourceButton";

export default abstract class Home extends GameComponent implements IHome {
    public fuelResource: Resource;

    // This is how we keep track of energy usage
    private fuelUsage: FuelUsage; // TODO: Update this class so it is specific to Resource types

    // Render components
    private homeWrapper: GameObjects.Rectangle;
    private resourceUsage: Text;
    private fuelAmountLabel: Text;
    private takeResourceButton: TakeResourceButton;

    public constructor(tag: string, private _maxResourceCount: number, private _fuelUsageSpeed: number) {
        super(tag);
    }

    public abstract usesResourceAsFuel(resource: Resource): boolean;

    public setFuelResource(resource: Resource) {
        this.fuelResource = resource;

        this.fuelUsage = new FuelUsage(this._maxResourceCount * this.fuelResource.fuelAmount);
    }

    public initializeComponent() {
        // Create the actual render
        this.homeWrapper = this.scene.add.rectangle(this.x, this.y, this.width, this.height);
        this.homeWrapper.setOrigin(0, 0);
        this.homeWrapper.isStroked = true;
        this.homeWrapper.strokeColor = 0xffffff;

        let yOffset = this.y + 10;
        let homeLabel = this.scene.add.existing(new Text(this.scene, this.x + 10, yOffset, `${this.type}`));

        this.fuelAmountLabel = this.scene.add.existing(new Text(this.scene, this.x + 20 + homeLabel.getBounds().width, yOffset, `%${this.fuelUsage.totalRemainingPercentage}`))

        yOffset += homeLabel.getBounds().height + 10;
        this.resourceUsage = this.scene.add.existing(new Text(this.scene, this.x + 10, yOffset, `${this.currentResourceCount} Remaining ${this.fuelResource.name}s`));

        this.takeResourceButton = this.initializeTakeResourceButton();
    }

    private initializeTakeResourceButton() {
        let yOffset = this.y + this.height - 10 - 30;

        let button = new TakeResourceButton(this.fuelResource, this.takeResource.bind(this));
        button.x = this.x + 10;
        button.y = yOffset;
        button.width = this.width - 20;
        button.height = 30;

        button.initializeComponent();

        return button;
    }

    private takeResource(takeFrom: Resource) {
        // let amountToTake = Math.min(this.maxResourceCount - this.currentResourceCount, takeFrom.resourceCollector.resourceQuantity.quantity);
        let amountToTake = Math.min(Math.min(1, this.maxResourceCount - this.currentResourceCount), takeFrom.resourceCollector.resourceQuantity.quantity);

        takeFrom.resourceCollector.resourceQuantity.removeFromQuantity(amountToTake);

        this.fuelUsage.addFuel(amountToTake, { burnSpeed: this._fuelUsageSpeed, remainingFuel: takeFrom.fuelAmount} as IFuelResource);
    }

    get currentResourceCount() {
        return this.fuelUsage.currentFuelCount;
    }

    get maxResourceCount() {
        return this._maxResourceCount;
    }

    get fuelUsageSpeed() {
        return this._fuelUsageSpeed;
    }

    public update(delta: number) {
        this.updateLabels();
        
        this.fuelUsage.useFuel(delta);
    }

    private updateLabels() {
        this.fuelAmountLabel.setText(`%${this.fuelUsage.totalRemainingPercentage}`);
        this.resourceUsage.setText(`${this.currentResourceCount} Remaining ${this.fuelResource.name}s`);
        this.takeResourceButton.updateResourceLabel();
    }
}