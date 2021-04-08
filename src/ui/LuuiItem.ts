export default abstract class LuuiItem extends Phaser.GameObjects.GameObject {
	public constructor(scene: Phaser.Scene, type: string, public x: number, public y: number, public width: number, public height: number) {
		super(scene, type);
	}

	public abstract init();

	public preUpdate() {}

	public abstract setVisible(isVisible: boolean);
}