export enum ResourceType {
	LOG,
}

export default abstract class Resource {
	public constructor(public name: string, public energyUnits: number) {}
}