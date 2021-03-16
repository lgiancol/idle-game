export default class ResourceCollector {
	private  _quantity: number = 0;
	private trueQuantity: number = 0;

	private _manualCollectSpeed: number = 1;
	private _manualCollectMultiplier: number = 1;

	private _baseCollectSpeed: number = 1;
	public autoCollectMultiplier: number = 0;

	get quantity() {
		return this._quantity;
	}

	get manualCollectSpeed() {
		return this._manualCollectSpeed;
	}

	get autoCollectSpeed() {
		return this._baseCollectSpeed * this.autoCollectMultiplier;
	}

	public increaseQuantity(increaseBy: number) {
		this.trueQuantity += increaseBy;
		this._quantity = Math.floor(this.trueQuantity);
	}

	public decreaseQuantity(decreaseBy: number) {
		this.trueQuantity -= decreaseBy;
		this._quantity = Math.floor(this.trueQuantity);
	}

	public update(delta: number) {
		let deltaSecond = delta / 1000;
		this.increaseQuantity(this.autoCollectSpeed * deltaSecond);
	}
}