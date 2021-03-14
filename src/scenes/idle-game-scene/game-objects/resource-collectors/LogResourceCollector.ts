import MarketManager from "../../market-manager/MarketManager";
import Log from "../../resources/Log";
import { ResourceType } from "../../resources/Resource";
import LogManager from "../../resources/resource-managers/LogManager";
import ResourceManager from "../../resources/resource-managers/ResourceManager";
import ResourceCollectorComponent from "../ResourceCollectorComponent";

export default class LogResourceCollector extends ResourceCollectorComponent<Log> {
	public constructor(scene: Phaser.Scene, public resourceManager: ResourceManager<Log>, public x: number, public y: number, public width = 100, public height = 84) {
		super(scene, resourceManager, x, y);
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'logResourceCollector',
	function(this: Phaser.GameObjects.GameObjectFactory, logResourceManager: LogManager, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceCollector = new LogResourceCollector(this.scene, logResourceManager, x, y, width, height);
		resourceCollector.setOrigin(0);
		
		this.displayList.add(resourceCollector);
		this.updateList.add(resourceCollector);

		resourceCollector.setInteractive({useHandCursor: true});

		function onClick() {
			resourceCollector.resourceManager.resourceCollector.increaseQuantity(resourceCollector.resourceManager.resourceCollector.manualCollectSpeed);

			const marketManager = (resourceCollector.scene.data.get('marketManager') as MarketManager);
			const currentActiveResource = marketManager.getActiveResource();

			if(currentActiveResource == null || currentActiveResource != ResourceType.LOG) {
				marketManager.setActiveResource(ResourceType.LOG);
			}
			
		}

		resourceCollector.on('pointerdown', onClick.bind(this));
		return resourceCollector;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			logResourceCollector(resourceManager: LogManager, x: number, y: number, width?: number, height?: number): LogResourceCollector
		}
	}
}