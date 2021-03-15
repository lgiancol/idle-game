import MarketManager from "../../market-manager/MarketManager";
import { ResourceType } from "../../resources/Resource";
import CoalManager from "../../resources/resource-managers/CoalManager";
import ResourceManager from "../../resources/resource-managers/ResourceManager";
import ResourceCollectorComponent from "./ResourceCollectorComponent";

export default class CoalResourceCollector extends ResourceCollectorComponent {
	public constructor(scene: Phaser.Scene, resourceManager: ResourceManager, public x: number, public y: number, public width = 100, public height = 84) {
		super(scene, 'Coal', resourceManager, x, y);
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'coalResourceCollector',
	function(this: Phaser.GameObjects.GameObjectFactory, resourceManager: ResourceManager, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceCollectorComponent = new CoalResourceCollector(this.scene, resourceManager, x, y, width, height);
		resourceCollectorComponent.setOrigin(0);
		
		this.displayList.add(resourceCollectorComponent);
		this.updateList.add(resourceCollectorComponent);

		resourceCollectorComponent.setInteractive({useHandCursor: true});

		function onClick() {
			const resourceManager = resourceCollectorComponent.resourceManager as CoalManager;
			resourceManager.collectResource(resourceManager.clickCollectSpeed);

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
			coalResourceCollector(resourceManager: ResourceManager, x: number, y: number, width?: number, height?: number): CoalResourceCollector
		}
	}
}