import { GameObjects } from "phaser";
import GameComponent from "../../../ui/GameComponent";
import Text from "../../../ui/Text";
import Resource from "../resources/Resource";

export default class TakeResourceButton extends GameComponent {
    private button: GameObjects.Rectangle;
    private label: Text;
    
    public constructor(private resourceToTake: Resource, private onClick: (takeFrom: Resource) => void) {
        super(`${resourceToTake.name}ResourceToTakeButton`);
    }

    public initializeComponent() {
        this.button = this.scene.add.rectangle(this.x, this.y, this.width, this.height);
        this.button.setOrigin(0, 0);
        this.button.isStroked = true;
        this.button.strokeColor = 0xffffff;

        this.button.setInteractive({useHandCursor: true})
        .on('pointerover', this.onHover.bind(this))
        .on('pointerout', this.onRest.bind(this))
        .on('pointerdown', this.onActive.bind(this))
        .on('pointerup', this.onHover.bind(this));

        this.button.on('pointerup', this._onClick.bind(this));

        let buttonBounds = this.button.getBounds();
        this.label = this.scene.add.existing( new Text(this.scene, buttonBounds.x + 10, buttonBounds.y + 6, `${this.resourceToTake.resourceCollector.resourceQuantity.quantity}`) );

        this.onRest();
    }

    private _onClick() {
        this.onClick(this.resourceToTake);
    }

    private onHover() {
        this.button.setFillStyle(0x888888);
    }

    private onRest() {
        this.button.setFillStyle(0x888888);
    }

    private onActive() {
        this.button.setFillStyle(0x444444);
    }

    public updateResourceLabel() {
        this.label.setText(`${this.resourceToTake.resourceCollector.resourceQuantity.quantity}`);
    }
}