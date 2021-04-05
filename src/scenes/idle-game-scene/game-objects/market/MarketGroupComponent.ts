import ResourceManager from "../../resources/resource-managers/ResourceManager";

export default abstract class MarketGroupComponent extends Phaser.GameObjects.GameObject implements Phaser.GameObjects.Components.Visible {
	public visible = false;

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

}