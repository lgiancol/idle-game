import { GameObjects } from "phaser";
import GameComponent from "../../../ui/GameComponent";
import Text from "../../../ui/Text";
import Resource from "../resources/Resource";
import IHome from "./IHome";
import TakeResourceButton from "./TakeResourceButton";

export default abstract class Home extends GameComponent implements IHome {
    private _currentResourceCount = 0;
    public acceptableResources = [] as Resource[];

    // Render components
    private homeWrapper: GameObjects.Rectangle;
    private resourceUsage: Text;
    // TODO: These next 2 go together and should be a class or something
    private takeResourceButton: TakeResourceButton;

    public constructor(tag: string, private _maxResourceCount: number, private _requiredEnergy: number) {
        super(tag);
    }

    public abstract usesResourceAsFuel(resource: Resource): boolean;

    public addAcceptableResource(resource: Resource) {
        this.acceptableResources.push(resource);
    }

    public initializeComponent() {
        // Create the actual render
        this.homeWrapper = this.scene.add.rectangle(this.x, this.y, this.width, this.height);
        this.homeWrapper.setOrigin(0, 0);
        this.homeWrapper.isStroked = true;
        this.homeWrapper.strokeColor = 0xffffff;

        let yOffset = this.y + 10;
        let homeLabel = this.scene.add.existing(new Text(this.scene, this.x + 10, yOffset, `${this.type}`));

        yOffset += homeLabel.getBounds().height + 10;
        this.resourceUsage = this.scene.add.existing(new Text(this.scene, this.x + 10, yOffset, `${this._currentResourceCount}/${this._maxResourceCount} resources`));

        this.takeResourceButton = this.initializeTakeResourceButton();
    }

    private initializeTakeResourceButton() {
        let yOffset = this.y + this.height - 10 - 30;

        let button = new TakeResourceButton(this.acceptableResources[0], this.takeResource.bind(this));
        button.x = this.x + 10;
        button.y = yOffset;
        button.width = this.width - 20;
        button.height = 30;

        button.initializeComponent();

        return button;
    }

    private takeResource(takeFrom: Resource) {
        let amountToTake = Math.min(this.maxResourceCount - this.currentResourceCount, takeFrom.resourceCollector.resourceQuantity.quantity);

        takeFrom.resourceCollector.resourceQuantity.removeFromQuantity(amountToTake);
        this._currentResourceCount += amountToTake;
    }

    get currentResourceCount() {
        return this._currentResourceCount;
    }

    get maxResourceCount() {
        return this._maxResourceCount;
    }

    get requiredEnergy() {
        return this._requiredEnergy;
    }

    public update(delta: number) {
        this.updateLabels();
    }

    private updateLabels() {
        this.resourceUsage.setText(`${this._currentResourceCount}/${this._maxResourceCount} resources`);
        this.takeResourceButton.updateResourceLabel();
    }
}