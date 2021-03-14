import MarketManager from "../../market-manager/MarketManager";
import Coal from "../../resources/Coal";
import { ResourceType } from "../../resources/Resource";
import CoalManager from "../../resources/resource-managers/CoalManager";
import ResourceCollector from "../../resources/resource-managers/resource-collector/ResourceCollector";
import ResourceManager from "../../resources/resource-managers/ResourceManager";
import ResourceCollectorComponent from "./ResourceCollectorComponent";

export default class CoalResourceCollector extends ResourceCollectorComponent {
	public constructor(scene: Phaser.Scene, resourceCollector: ResourceCollector, public x: number, public y: number, public width = 100, public height = 84) {
		super(scene, 'Coal', resourceCollector, x, y);
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'coalResourceCollector',
	function(this: Phaser.GameObjects.GameObjectFactory, resourceCollector: ResourceCollector, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceCollectorComponent = new CoalResourceCollector(this.scene, resourceCollector, x, y, width, height);
		resourceCollectorComponent.setOrigin(0);
		
		this.displayList.add(resourceCollectorComponent);
		this.updateList.add(resourceCollectorComponent);

		resourceCollectorComponent.setInteractive({useHandCursor: true});

		function onClick() {
			resourceCollectorComponent.resourceCollector.increaseQuantity(resourceCollectorComponent.resourceCollector.manualCollectSpeed);

			const marketManager = (resourceCollectorComponent.scene.data.get('marketManager') as MarketManager);
			const currentActiveResource = marketManager.getActiveResource();

			if(currentActiveResource == null || currentActiveResource != ResourceType.COAL) {
				marketManager.setActiveResource(ResourceType.COAL);
			}
			
		}

		resourceCollectorComponent.on('pointerdown', onClick.bind(this));
		return resourceCollectorComponent;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			coalResourceCollector(resourceCollector: ResourceCollector, x: number, y: number, width?: number, height?: number): CoalResourceCollector
		}
	}
}