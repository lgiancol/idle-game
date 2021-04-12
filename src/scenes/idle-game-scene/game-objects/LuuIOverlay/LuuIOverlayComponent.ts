import { getGameHeight, getGameWidth } from "../../../../helpers";
import LuuIOverlayContentComponent from "./LuuIOverlayContentComponent";

export default class LuuIOverlayContainerComponent extends Phaser.GameObjects.Rectangle {
	private bg: Phaser.GameObjects.Rectangle;
	private _content: LuuIOverlayContentComponent;
	public constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
		// super(scene, x, y, 'overlay_bg');
		super(scene, x, y, width, height);
		this.setDisplaySize(width, height)
		.setDepth(10)
		.setFillStyle(0xa2a2a2);
	}

	set content(content: LuuIOverlayContentComponent) {
		content.setParentOverlayContainer(this);
		this._content = content;
	}

	public init() {
		this.bg = this.scene.add.rectangle(0, 0, getGameWidth(this.scene), getGameHeight(this.scene))
		.setOrigin(0)
		.setFillStyle(0x000000, 0.50)
		.setDepth(10)
		.setInteractive({useHandCursor: true})
		.on('pointerdown', this.destroy.bind(this));
	}

	public destroy() {
		this.bg.destroy();
		this._content.destroy();

		super.destroy();
	}
}

function helper(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
	const luuIOverlayContainer = new LuuIOverlayContainerComponent(scene, x - (width / 2), y - (height / 2), width, height);
	luuIOverlayContainer
	.setOrigin(0)
	.setInteractive();

	luuIOverlayContainer.init();

	return luuIOverlayContainer;
}

Phaser.GameObjects.GameObjectFactory.register(
	'luuIOverlayContainerSmall',
	function(this: Phaser.GameObjects.GameObjectFactory) {
		const gameWidth = getGameWidth(this.scene);
		const gameHeight = getGameHeight(this.scene);
		let width = gameWidth * 0.4;
		let height = gameHeight * 0.4;
		
		const luuIOverlayContainer = helper(this.scene, gameWidth / 2, gameHeight / 2, width, height);

		this.displayList.add(luuIOverlayContainer);
		// this.updateList.add(luuIOverlayContainer);

		return luuIOverlayContainer;
	}
);

Phaser.GameObjects.GameObjectFactory.register(
	'luuIOverlayContainerMedium',
	function(this: Phaser.GameObjects.GameObjectFactory) {
		const gameWidth = getGameWidth(this.scene);
		const gameHeight = getGameHeight(this.scene);
		let width = gameWidth * 0.6;
		let height = gameHeight * 0.6;

		const luuIOverlayContainer = helper(this.scene, gameWidth / 2, gameHeight / 2, width, height);

		this.displayList.add(luuIOverlayContainer);
		// this.updateList.add(luuIOverlayContainer);

		return luuIOverlayContainer;
	}
);

Phaser.GameObjects.GameObjectFactory.register(
	'luuIOverlayContainerLarge',
	function(this: Phaser.GameObjects.GameObjectFactory) {
		const gameWidth = getGameWidth(this.scene);
		const gameHeight = getGameHeight(this.scene);
		let width = gameWidth * 0.85;
		let height = gameHeight * 0.85;

		const luuIOverlayContainer = helper(this.scene, gameWidth / 2, gameHeight / 2, width, height);

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
			luuIOverlayContainerSmall(this: Phaser.GameObjects.GameObjectFactory): LuuIOverlayContainerComponent,
			luuIOverlayContainerMedium(this: Phaser.GameObjects.GameObjectFactory): LuuIOverlayContainerComponent,
			luuIOverlayContainerLarge(this: Phaser.GameObjects.GameObjectFactory): LuuIOverlayContainerComponent
		}
	}
}