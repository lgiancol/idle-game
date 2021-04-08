export default class LuuIOverlayContainerComponent extends Phaser.GameObjects.Sprite {
	public constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
		super(scene, x, y, 'purple_btn');
		this.setSize(width, height)
		.setDisplaySize(width, height)
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'luuIOverlayContainer',
	function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, size: 'small' | 'medium' | 'large') {
		let width = 0;
		let height = 0;
		switch(size) {
			case 'small': {
				width = 400;
				height = 200;
				break;
			}
			case 'medium': {
				width = 600;
				height = 400;
				break;
			}
			case 'large': {
				width = 800;
				height = 600;
				break;
			}
		}

		const luuIOverlayContainer = new LuuIOverlayContainerComponent(this.scene, x, y, width, height);
		luuIOverlayContainer.setInteractive()
		.setOrigin(0);

		// luuIOverlayContainer.init();
		
		this.displayList.add(luuIOverlayContainer);
		// this.updateList.add(luuIOverlayContainer);

		return luuIOverlayContainer;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			luuIOverlayContainer(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, size: 'small' | 'medium' | 'large'): LuuIOverlayContainerComponent
		}
	}
}