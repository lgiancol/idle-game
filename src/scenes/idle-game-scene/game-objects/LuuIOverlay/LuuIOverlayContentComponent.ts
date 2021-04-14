import LuuIOverlayContainerComponent from "./LuuIOverlayComponent";

export default abstract class LuuIOverlayContentComponent extends Phaser.GameObjects.GameObject {
	protected parentOverlayContainer: LuuIOverlayContainerComponent;
	public constructor(scene: Phaser.Scene, public x: number, public y: number, public width: number, public height: number) {
		super(scene, 'LuuiOverlayContentComponent');
	}

	public setParentOverlayContainer(parentOverlayContainer: LuuIOverlayContainerComponent) {
		this.parentOverlayContainer = parentOverlayContainer;

		this.x = this.parentOverlayContainer.x;
		this.y = this.parentOverlayContainer.y;
		this.width = this.parentOverlayContainer.getBounds().width;
		this.height = this.parentOverlayContainer.getBounds().height;

		this.resize();
	}

	public abstract resize();
}