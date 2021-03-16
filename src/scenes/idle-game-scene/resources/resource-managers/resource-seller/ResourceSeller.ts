export default class ResourceSeller {
	private _valueMultiplier = 1; // How much to increase the _value

	public constructor(private _value) {}

	get valuePer() {
		return this._value * this._valueMultiplier;
	}

	get valueMultiplier() {
		return this._valueMultiplier;
	}

	set valueMultiplier(valueMultiplier: number) {
		this._valueMultiplier = valueMultiplier;
	}

	public sellResource(resourcesSold: number) {
		return this.valuePer * resourcesSold;
	}
}