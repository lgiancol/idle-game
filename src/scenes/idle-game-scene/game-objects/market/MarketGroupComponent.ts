import ResourceManager from "../../resources/resource-managers/ResourceManager";

export default abstract class MarketGroupComponent extends Phaser.GameObjects.GameObject implements Phaser.GameObjects.Components.Visible {
	public visible = true;
	public depth = 0;

	public constructor(scene: Phaser.Scene, private _activeResourceManager: ResourceManager, public x: number, public y: number, public width: number, public height: number) {
		super(scene, 'MarketGroup');
	}

	get activeResourceManager() {
		return this._activeResourceManager;
	}

	set activeResourceManager(activeResourceManager: ResourceManager) {
		this._activeResourceManager = activeResourceManager;
		this.init();
	}

	public abstract init();
	public abstract setVisible(value: boolean): this;
	public abstract setActive(value: boolean): this;

	public setPosition(x?: number, y?: number) {
		this.x = x;
		this.y = y;

		return this;
	}

	public setSize(width: number, height?: number) {
		this.width = width;
		this.height = height;
		return this;
	}

	public setDepth(depth: number) {
		this.depth = depth;

		return this;
	}

}