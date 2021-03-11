import { GameObjects } from "phaser";
import GameComponent from "../../../../ui/GameComponent";
import Text from "../../../../ui/Text";
import ResourceCollector from "../../resources/ResourceCollector";

export default class ResourceCollectorComponent extends GameComponent {
    // Render components
    protected resourceCollectorButton: GameObjects.Rectangle;
    protected resourceLabel: Text;

    public constructor(tag: string, protected resourceCollector: ResourceCollector) {
        super(tag);
    }

    public initializeComponent() {
        // Create the actual render
		let container = this.scene.add.rectangle(this.x, this.y, this.width, this.height)
			.setStrokeStyle(1, 0xffffff)
			.setOrigin(0, 0);
		
        let yOffset = this.y + 10;
        this.resourceLabel = this.scene.add.existing(new Text(this.scene, this.x + 10, yOffset, `${this.type}: ${this.resourceCollector.resourceQuantity.quantity}`));
        yOffset += this.resourceLabel.getBounds().height + 10;
		
        this.resourceCollectorButton = this.scene.add.rectangle(this.x + 10, (this.y + this.height) - 40, this.width - 20, 30);
        this.resourceCollectorButton.setInteractive({useHandCursor: true})
        .on('pointerover', this.onHover.bind(this))
        .on('pointerout', this.onRest.bind(this))
        .on('pointerdown', this.onActive.bind(this))
        .on('pointerup', this.onHover.bind(this));
        this.resourceCollectorButton.setOrigin(0, 0);
        this.resourceCollectorButton.isStroked = true;
        this.resourceCollectorButton.strokeColor = 0xffffff;
        this.resourceCollectorButton.on('pointerup', this.onClick.bind(this));

		this.scene.add.existing(new Text(this.scene, this.resourceCollectorButton.x + 10, this.resourceCollectorButton.y + 3, `Collect`));

        this.onRest();
    }

    private onClick() {
        this.collectAmount(this.resourceCollector.clickAmount);
    }

    private onHover() {
        // this.resourceLabel.setColor('#000000');
        this.resourceCollectorButton.setFillStyle(0x888888);
    }

    private onRest() {
        // this.resourceLabel.setColor('#FFFFFF');
        this.resourceCollectorButton.setFillStyle(0x888888);
    }

    private onActive() {
        // this.resourceLabel.setColor('#BBBBBB');
        this.resourceCollectorButton.setFillStyle(0x444444);
    }

    protected collect(deltaSecond: number) {
        this.collectAmount(this.resourceCollector.collectSpeed * deltaSecond);
    }

    private collectAmount(toCollect: number) {
        this.resourceCollector.resourceQuantity.addToQuantity(toCollect);
    }

    public update(delta: number) {
        this.collect(delta / 1000);

        this.updateLabels();
    }

    private updateLabels() {
        this.resourceLabel.setText(`${this.type}: ${this.resourceCollector.resourceQuantity.quantity}`);
    }
}