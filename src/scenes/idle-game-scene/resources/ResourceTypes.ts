
export enum ResourceType {
	LOG = 'Log',
	COAL = 'Coal',
}

export default class Resource {
	// Instances
	public static LOG = new Resource('LOG', 1);

	// Static methods
	static get values() {
		return [
			this.LOG,
		];
	}

	public static fromString(name: string) {
		const value = (this as any)[name];

		if(value) return value;

		throw new RangeError(
			`Illegal argument passed to fromString(): ${name} does to correspond to any instance of the enum ${(this as any).prototype.constructor.name}`
		);
	}

	// Constructor
	private constructor(
		public readonly name: string, // The name of the resource
		public readonly baseValue: number, // The base amount of money you get when you sell this resource
	) {}

	// Public methods
	public toJson() {
		return this.name;
	}
}