import MarketManager from "../../market-manager/MarketManager";
import { ResourceType } from "../../resources/Resource";
import LogManager from "../../resources/resource-managers/LogManager";
import ResourceManager from "../../resources/resource-managers/ResourceManager";
import ResourceCollectorComponent from "./ResourceCollectorComponent";

export default class LogResourceCollector extends ResourceCollectorComponent {
	public constructor(scene: Phaser.Scene, resourceManager: ResourceManager, public x: number, public y: number, public width = 100, public height = 84) {
		super(scene, 'Log', resourceManager, x, y);
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'logResourceCollector',
	function(this: Phaser.GameObjects.GameObjectFactory, resourceManager: ResourceManager, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceCollectorComponent = new LogResourceCollector(this.scene, resourceManager, x, y, width, height);
		resourceCollectorComponent.setOrigin(0);
		
		this.displayList.add(resourceCollectorComponent);
		this.updateList.add(resourceCollectorComponent);

		resourceCollectorComponent.setInteractive({useHandCursor: true});

		function onClick() {
			const resourceManager = resourceCollectorComponent.resourceManager as LogManager;
			resourceManager.collectResource(resourceManager.clickCollectSpeed);

			const marketManager = (resourceCollectorComponent.scene.data.get('marketManager') as MarketManager);
			const currentActiveResource = marketManager.getActiveResource();

			if(currentActiveResource == null || currentActiveResource != ResourceType.LOG) {
				marketManager.setActiveResource(ResourceType.LOG);
			}
			
		}

		resourceCollectorComponent.on('pointerdown', onClick.bind(this));
		return resourceManager;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			logResourceCollector(resourceManager: ResourceManager, x: number, y: number, width?: number, height?: number): LogResourceCollector
		}
	}
}