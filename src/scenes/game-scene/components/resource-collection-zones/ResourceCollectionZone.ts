import Text from "../../../../ui/Text";
import ResourceCollector from "../../resources/ResourceCollector";
import ResourceCollectorComponent from "../resource-collectors/ResourceCollectorComponent";
import ZoneComponent from "../ZoneComponent";

export default class ResourceCollectionZone extends ZoneComponent<ResourceCollector> {
    private resourceCollectorComponents: ResourceCollectorComponent[];
    private resourceCollectors: ResourceCollector[];

    public constructor() {
        super('ResourceCollectionMapArea');
        this.resourceCollectorComponents = [] as ResourceCollectorComponent[];
        this.resourceCollectors = [] as ResourceCollector[];
    }

    public addToZone(toAdd: ResourceCollector) {
        this.resourceCollectorComponents.push(new ResourceCollectorComponent(toAdd.resourceName, toAdd));
        this.resourceCollectors.push(toAdd);
    }

    public initializeComponent() {
        this.scene.add.rectangle(this.x, this.y, this.width, this.height)
            .setStrokeStyle(1, 0xffffff)
            .setOrigin(0, 0);
        
        let label = this.scene.add.existing(new Text(this.scene, this.x + 10, this.y + 10, 'Resource Collection'));

        this.resourceCollectorComponents.forEach((resourceCollectorComponent: ResourceCollectorComponent, i: number) => {
            resourceCollectorComponent.x = this.x + 10 + (i * 100) + (i * 10);
            resourceCollectorComponent.y = (label.y + label.height) + 10;
            resourceCollectorComponent.width = 200;
            resourceCollectorComponent.height = 100;
            resourceCollectorComponent.initializeComponent();
        });
    }

    public update(delta: number) {
        this.resourceCollectorComponents.forEach((resourceCollectorComponent: ResourceCollectorComponent) => {
            resourceCollectorComponent.update(delta);
        });
        
    }
}