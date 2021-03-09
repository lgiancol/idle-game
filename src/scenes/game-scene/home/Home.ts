import { GameObjects } from "phaser";
import GameComponent from "../../../ui/GameComponent";
import Text from "../../../ui/Text";
import IHome from "./IHome";

export default abstract class Home extends GameComponent implements IHome {
    private _currentResourceCount = 0;

    // Render components
    private homeWrapper: GameObjects.Rectangle;
    private resourceUsage: Text;
    private takeResourceButton: GameObjects.Rectangle;

    public constructor(tag: string, private _maxResourceCount: number, private _requiredEnergy: number) {
        super(tag);
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
        this.onRest();
    }

    private initializeTakeResourceButton() {
        let yOffset = this.y + this.height - 10 - 30;

        let button = this.scene.add.rectangle(this.x + 10, yOffset, this.width - 20, 30);
        button.setOrigin(0, 0);
        button.isStroked = true;
        button.strokeColor = 0xffffff;

        button.setInteractive({useHandCusor: true})
        .on('pointerover', this.onHover.bind(this))
        .on('pointerout', this.onRest.bind(this))
        .on('pointerdown', this.onActive.bind(this))
        .on('pointerup', this.onHover.bind(this));

        button.on('pointerup', this.onClick.bind(this));

        return button;
    }

    private onClick() {
        console.log('Take resource!!!!!');
    }

    private onHover() {
        this.takeResourceButton.setFillStyle(0x888888);
    }

    private onRest() {
        this.takeResourceButton.setFillStyle(0x888888);
    }

    private onActive() {
        this.takeResourceButton.setFillStyle(0x444444);
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
    }
}