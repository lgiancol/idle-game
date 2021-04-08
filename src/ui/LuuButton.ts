
export default class LuuButton extends Phaser.GameObjects.Sprite {
	public label: Phaser.GameObjects.Text;
	private enabled = true;
	private isHover = false;

	public constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, public text: string) {
		super(scene, x, y, 'purple_btn');
	}

	public init() {
		this.on('pointerover', this.renderHover.bind(this))
		.on('pointerout', this.renderRest.bind(this))
		.on('pointerdown', this.renderRest.bind(this))
		.on('pointerup', this.renderHover.bind(this));

		this.label = this.scene.add.text(this.x + this.width / 2, this.y + this.height / 2, this.text)
		.setOrigin(0.5)
		.setColor('black')
		.setFontFamily('my-font')
		.setDepth(1);

		this.renderRest();
	}
	
	public setVisible(value: boolean) {
		super.setVisible(value);
		this.label.setVisible(value);
		return this;
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
		this.setTexture('purple_btn');
		this.label.setColor('black')
	}

	private renderDisabled() {
		this.label.setColor('#391339')
	}

	private renderHover() {
		this.isHover = true;

		if(!this.enabled) return;

		this.setTexture('purple_btn_active');
	}

	public setText(text: string) {
		this.text = text;
		this.label.setText(this.text);

		return this;
	}

	public setEnabled(enabled: boolean) {
		this.enabled = enabled;
		this.setInteractive();
		
		return this;
	}

	public destroy() {
		this.label.destroy();

		super.destroy();
	}

}

Phaser.GameObjects.GameObjectFactory.register(
	'luuButton',
	function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, width: number, height: number, text: string) {
		const luuButton = new LuuButton(this.scene, x, y, width, height, text);
		luuButton.setInteractive()
		.setOrigin(0)
		.setSize(width, height)
		.setDisplaySize(width, height);

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