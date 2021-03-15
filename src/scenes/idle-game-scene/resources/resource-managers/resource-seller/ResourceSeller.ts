export default class ResourceSeller {
	private _valueMultiplier = 1; // How much to increase the _value
	private _value = 1; // How much it can sell for

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