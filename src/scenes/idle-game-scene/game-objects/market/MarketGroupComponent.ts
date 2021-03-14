export default abstract class MarketGroupComponent extends Phaser.GameObjects.Rectangle {
	public constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
		super(scene, x, y, width, height);
	}

	public init() {};
}