export default class ResourceCollector {
	public quantity: number = 0;
	private trueQuantity: number = 0;

	public manualCollectSpeed: number = 1;
	public autoCollectSpeed: number = 0;

	public increaseQuantity(increaseBy: number) {
		this.trueQuantity += increaseBy;
		this.quantity = Math.floor(this.trueQuantity);
	}

	public decreaseQuantity(decreaseBy: number) {
		this.trueQuantity -= decreaseBy;
		this.quantity = Math.floor(this.trueQuantity);
	}

	public update(delta: number) {
		let deltaSecond = delta / 1000;
		this.increaseQuantity(this.autoCollectSpeed * deltaSecond);
	}
}