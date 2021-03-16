
export enum ResourceType {
	LOG,
	COAL,
}

export default abstract class Resource {
	public constructor(public name: string, public energyUnits: number, private _startingValue: number) {}

	get startingValue() {
		return this._startingValue;
	}
}