import ResourceManager from "../../resources/resource-managers/ResourceManager";

export default abstract class MarketGroupComponent extends Phaser.GameObjects.Group {
	public constructor(scene: Phaser.Scene, private _activeResourceManager: ResourceManager, public x: number, public y: number, public width: number, public height: number) {
		super(scene);
	}

	get activeResourceManager() {
		return this._activeResourceManager;
	}

	set activeResourceManager(activeResourceManager: ResourceManager) {
		this._activeResourceManager = activeResourceManager;
		this.init();
	}

	public abstract init();

}