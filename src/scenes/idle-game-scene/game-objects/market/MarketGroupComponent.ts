import UpgradeManager from "../../upgrades/UpgradeManager";

export default abstract class MarketGroupComponent extends Phaser.GameObjects.Rectangle {
	public constructor(scene: Phaser.Scene, private _activeUpgradeManager: UpgradeManager<any>, x: number, y: number, width: number, height: number) {
		super(scene, x, y, width, height);
	}

	get activeUpgradeManager() {
		return this._activeUpgradeManager;
	}

	set activeUpgradeManager(activeUpgradeManager: UpgradeManager<any>) {
		this._activeUpgradeManager = activeUpgradeManager;
		this.init();
	}

	public init() {};
}