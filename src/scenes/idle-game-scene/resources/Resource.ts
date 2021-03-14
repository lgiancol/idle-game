export enum ResourceType {
	LOG,
	COAL,
}

export default abstract class Resource {
	public constructor(public name: string, public energyUnits: number) {}
}