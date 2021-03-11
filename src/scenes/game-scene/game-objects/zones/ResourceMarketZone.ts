import Text from "../../../../ui/Text";
import ZoneComponent from "./ZoneComponent";

export default class ResourceMarketZone extends ZoneComponent {
    public constructor() {
        super('ResourceMarketZone');
    }

    public initializeComponent() {
        this.scene.add.rectangle(this.x, this.y, this.width, this.height)
            .setStrokeStyle(1, 0xffffff)
            .setOrigin(0, 0);
        
        let label = this.scene.add.existing(new Text(this.scene, this.x + 10, this.y + 10, 'Market'));
    }
}