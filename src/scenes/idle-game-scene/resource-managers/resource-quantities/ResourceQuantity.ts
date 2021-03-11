export default class ResourceQuantity {
	public quantity: number = 0;
	private trueQuantity: number = 0;

	public increaseQuantity(increaseBy: number) {
		this.trueQuantity += increaseBy;
		this.quantity = Math.floor(this.trueQuantity);
	}
}