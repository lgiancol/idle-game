import LuuiItem from "./LuuiItem";

export default class LuuButton extends LuuiItem {
	public label: Phaser.GameObjects.Text;
	private enabled = false;
	private isHover = false;

	public constructor(scene: Phaser.Scene, public x: number, public y: number, public width: number, public height: number, public text: string) {
		super(scene, x, y, width, height);
	}

	public init() {
		this.setFillStyle(0x993399);

		this.label = this.scene.add.text(this.x + 10, this.y + 10, this.text)
		.setOrigin(0)
		.setColor('black')
		.setFontFamily('my-font')
		.setDepth(1);

		this.on('pointerover', this.renderHover.bind(this))
		.on('pointerout', this.renderRest.bind(this));

		this.renderRest();
	}

	public preUpdate() {
		if(!this.enabled) {
			this.renderDisabled();
		} else {
			if(!this.isHover) {
				this.renderRest();
			}
		}
	}

	private renderRest() {
		this.isHover = false;
		this.setFillStyle(0x993399);
		this.label.setColor('black')
	}

	private renderDisabled() {
		this.setFillStyle(0x755775);
		this.label.setColor('#391339')
	}

	private renderHover() {
		this.isHover = true;

		if(!this.enabled) return;

		this.setFillStyle(0xbf40bf);
		// this.label.setColor('white')
	}

	public setText(text: string) {
		this.text = text;
		this.label.setText(this.text);

		return this;
	}

	public setEnabled(enabled: boolean) {
		this.enabled = enabled;
		this.setInteractive({useHandCursor: this.enabled});
		
		return this;
	}

}

Phaser.GameObjects.GameObjectFactory.register(
	'luuButton',
	function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, width: number, height: number, text: string) {
		const luuButton = new LuuButton(this.scene, x, y, width, height, text)
		.setOrigin(0);

		luuButton.init();
		
		this.displayList.add(luuButton);
		this.updateList.add(luuButton);

		return luuButton;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			luuButton(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, width: number, height: number, text: string): LuuButton
		}
	}
}