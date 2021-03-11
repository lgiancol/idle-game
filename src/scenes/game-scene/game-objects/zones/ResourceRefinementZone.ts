import Text from "../../../../ui/Text";
import ZoneComponent from "./ZoneComponent";

export default class ResourceRefinementZone extends ZoneComponent {

    public constructor() {
        super('ResourceRefinementZone');
    }

    public initializeComponent() {
        this.scene.add.rectangle(this.x, this.y, this.width, this.height)
            .setStrokeStyle(1, 0xffffff)
            .setOrigin(0, 0);
        
        this.scene.add.existing(new Text(this.scene, this.x + 10, this.y + 10, 'Resource Refinement'));
    }
}