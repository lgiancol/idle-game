import { GameObjects } from "phaser";
import GameComponent from "../../../ui/GameComponent";
import Text from "../../../ui/Text";
import IResourceCollector from "./IResourceCollector";
import Resource from "./Resource";

export default abstract class ResourceCollector<T extends Resource> extends GameComponent implements IResourceCollector{
    private _quantity = 0; // Whole number
    private _trueQuantity = 0; // Decimal

    // Render components
    private resourceCollectorButton: GameObjects.Rectangle;
    private resourceLabel: Text;
    private quantityLabel: Text;

    public constructor(protected resource: T, private _collectSpeed: number, private _clickAmount: number) {
        super(resource.name + 'Collector');
    }

    get quantity() {
        return this._quantity;
    }

    get collectSpeed() {
        return this._collectSpeed;
    }

    get clickAmount() {
        return this._clickAmount;
    }

    public initializeComponent() {
        // Create the actual render
        this.resourceCollectorButton = this.createResourceCollectorButton();

        let yOffset = this.y + 10;
        this.resourceLabel = this.scene.add.existing(new Text(this.scene, this.x + 10, yOffset, `${this.resource.name}s`));

        yOffset += this.resourceLabel.getBounds().height + 10;
        this.quantityLabel = this.scene.add.existing(new Text(this.scene, this.x + 10, yOffset, `${this._quantity}`));

        this.onRest();
    }

    private createResourceCollectorButton() {
        let resourceCollectorButton = this.scene.add.rectangle(this.x, this.y, this.width, this.height);
        resourceCollectorButton.setInteractive({useHandCusor: true})
        .on('pointerover', this.onHover.bind(this))
        .on('pointerout', this.onRest.bind(this))
        .on('pointerdown', this.onActive.bind(this))
        .on('pointerup', this.onHover.bind(this));
        resourceCollectorButton.setOrigin(0, 0);
        resourceCollectorButton.isStroked = true;
        resourceCollectorButton.strokeColor = 0xffffff;

        resourceCollectorButton.on('pointerup', this.onClick.bind(this));

        return resourceCollectorButton;
    }

    private onClick() {
        this.collectAmount(this.clickAmount);
    }

    private onHover() {
        this.resourceLabel.setColor('#000000');
        this.quantityLabel.setColor('#000000');
        this.resourceCollectorButton.setFillStyle(0x888888);
    }

    private onRest() {
        this.resourceLabel.setColor('#FFFFFF');
        this.quantityLabel.setColor('#FFFFFF');
        this.resourceCollectorButton.setFillStyle(0x888888);
    }

    private onActive() {
        this.resourceLabel.setColor('#BBBBBB');
        this.quantityLabel.setColor('#BBBBBB');
        this.resourceCollectorButton.setFillStyle(0x444444);
    }

    public update(delta: number) {
        this.collect(delta / 1000);

        this.updateLabels();
    }

    private updateLabels() {
        this.quantityLabel.setText(`${this._quantity}`);
    }

    protected collect(deltaSecond: number) {
        this.collectAmount(this._collectSpeed * deltaSecond);
    }

    private collectAmount(toCollect: number) {
        this._trueQuantity += toCollect;
        this._quantity = Math.floor(this._trueQuantity);
    }
}