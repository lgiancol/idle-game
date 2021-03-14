import MarketManager from "../../market-manager/MarketManager";
import Coal from "../../resources/Coal";
import { ResourceType } from "../../resources/Resource";
import CoalManager from "../../resources/resource-managers/CoalManager";
import ResourceManager from "../../resources/resource-managers/ResourceManager";
import ResourceCollector from "../ResourceCollector";

export default class CoalResourceCollector extends ResourceCollector<Coal> {
	public constructor(scene: Phaser.Scene, public resourceManager: ResourceManager<Coal>, public x: number, public y: number, public width = 100, public height = 84) {
		super(scene, resourceManager, x, y);
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'coalResourceCollector',
	function(this: Phaser.GameObjects.GameObjectFactory, coalResourceManager: CoalManager, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceCollector = new CoalResourceCollector(this.scene, coalResourceManager, x, y, width, height);
		resourceCollector.setOrigin(0);
		
		this.displayList.add(resourceCollector);
		this.updateList.add(resourceCollector);

		resourceCollector.setInteractive({useHandCursor: true});

		function onClick() {
			resourceCollector.resourceManager.resourceQuantity.increaseQuantity(resourceCollector.resourceManager.manualCollectSpeed);

			const marketManager = (resourceCollector.scene.data.get('marketManager') as MarketManager);
			const currentActiveResource = marketManager.getActiveResource();

			if(currentActiveResource == null || currentActiveResource != ResourceType.COAL) {
				marketManager.setActiveResource(ResourceType.COAL);
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
			coalResourceCollector(resourceManager: CoalManager, x: number, y: number, width?: number, height?: number): CoalResourceCollector
		}
	}
}