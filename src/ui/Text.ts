export default class Text extends Phaser.GameObjects.Text {
    public constructor(scene: Phaser.Scene, x: number, y: number, text: string) {
        super(scene, x, y, text, null);

        this.setFontFamily('my-font');
    }
}