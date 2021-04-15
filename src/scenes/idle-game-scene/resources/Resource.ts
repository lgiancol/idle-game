export default class Resource {
	// Instances
	//  LOGs and anything related to LOGs
	public static LOG = new Resource('LOG', 1);
	public static PLANKS = new Resource('PLANKS', 6); // 5 LOGs required for 1 PLANKS

	//  COAL and antything related to COAL
	public static COAL = new Resource('COAL', 1.15);

	// Static methods
	static get values() {
		return [
			this.LOG,
			this.PLANKS,
			this.COAL,
		];
	}

	public static fromString(name: string) {
		const value = (this as any)[name];

		if(value) return value;

		throw new RangeError(
			`Illegal argument passed to fromString(): ${name} does to correspond to any instance of the enum ${(this as any).prototype.constructor.name}`
		);
	}

	/**
	 * 
	 * @param name The name of the resource
	 * @param baseValue The base amount of money you get when you sell this resource
	 */
	private constructor(
		public readonly name: string,
		public readonly baseValue: number,
	) {}

	// Public methods
	public toJson() {
		return this.name;
	}
}