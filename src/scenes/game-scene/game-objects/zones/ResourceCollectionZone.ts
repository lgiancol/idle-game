import Text from "../../../../ui/Text";
import ResourceCollector from "../../resources/ResourceCollector";
import ResourceCollectorComponent from "../resource-collectors/ResourceCollectorComponent";
import ZoneComponent from "./ZoneComponent";

export default class ResourceCollectionZone extends ZoneComponent {
    private resourceCollectorComponents: ResourceCollectorComponent[];
    private resourceCollectors: ResourceCollector[];

	private container: Phaser.GameObjects.Rectangle;
    public constructor() {
        super('ResourceCollectionZone');
        this.resourceCollectorComponents = [] as ResourceCollectorComponent[];
        this.resourceCollectors = [] as ResourceCollector[];
    }

    public addResourceCollector(toAdd: ResourceCollector) {
        this.resourceCollectorComponents.push(new ResourceCollectorComponent(toAdd.resourceName, toAdd));
        this.resourceCollectors.push(toAdd);
    }

    public initializeComponent() {
        this.container = this.scene.add.rectangle(this.x, this.y, this.width, this.height)
            .setStrokeStyle(1, 0xffffff)
            .setOrigin(0, 0);
        
        let label = this.scene.add.existing(new Text(this.scene, this.x + 10, this.y + 10, 'Resource Collection'));

		const padding = 10;
		const columnCount = Math.min(3, this.resourceCollectors.length);
		const resourceCollectorWidth = (this.width / columnCount) - (((columnCount + 1) * padding) / columnCount);
		const resourceCollectorHeight = 100;

		let columnIndex = 0;
		let rowIndex = 0;
        this.resourceCollectorComponents.forEach((resourceCollectorComponent: ResourceCollectorComponent, i: number) => {
			if(i > 0 && i % columnCount == 0) {
				rowIndex++;
				columnIndex = 0;
			}
            resourceCollectorComponent.x = this.x + padding +(columnIndex * resourceCollectorWidth) + (columnIndex * padding);
            resourceCollectorComponent.y = (label.y + label.height) + padding + (rowIndex * resourceCollectorHeight) + (rowIndex * padding);
            resourceCollectorComponent.width = resourceCollectorWidth;
            resourceCollectorComponent.height = resourceCollectorHeight;
            resourceCollectorComponent.initializeComponent();

			columnIndex++;
        });
    }

    public update(delta: number) {
        this.resourceCollectorComponents.forEach((resourceCollectorComponent: ResourceCollectorComponent) => {
            resourceCollectorComponent.update(delta);
        });
        
    }
}