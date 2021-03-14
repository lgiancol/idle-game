import MarketManager from "../../market-manager/MarketManager";
import { ResourceType } from "../../resources/Resource";
import ResourceCollector from "../../resources/resource-managers/resource-collector/ResourceCollector";
import ResourceCollectorComponent from "./ResourceCollectorComponent";

export default class LogResourceCollector extends ResourceCollectorComponent {
	public constructor(scene: Phaser.Scene, resourceCollector: ResourceCollector, public x: number, public y: number, public width = 100, public height = 84) {
		super(scene, 'Log', resourceCollector, x, y);
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'logResourceCollector',
	function(this: Phaser.GameObjects.GameObjectFactory, resourceCollector: ResourceCollector, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceCollectorComponent = new LogResourceCollector(this.scene, resourceCollector, x, y, width, height);
		resourceCollectorComponent.setOrigin(0);
		
		this.displayList.add(resourceCollectorComponent);
		this.updateList.add(resourceCollectorComponent);

		resourceCollectorComponent.setInteractive({useHandCursor: true});

		function onClick() {
			resourceCollectorComponent.resourceCollector.increaseQuantity(resourceCollectorComponent.resourceCollector.manualCollectSpeed);

			const marketManager = (resourceCollectorComponent.scene.data.get('marketManager') as MarketManager);
			const currentActiveResource = marketManager.getActiveResource();

			if(currentActiveResource == null || currentActiveResource != ResourceType.LOG) {
				marketManager.setActiveResource(ResourceType.LOG);
			}
			
		}

		resourceCollectorComponent.on('pointerdown', onClick.bind(this));
		return resourceCollector;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			logResourceCollector(resourceCollector: ResourceCollector, x: number, y: number, width?: number, height?: number): LogResourceCollector
		}
	}
}