export default class Resource {
	// Instances
	//  LOGs and anything related to LOGs
	public static LOG = new Resource('log', 1);
	public static PLANKS = new Resource('planks', 6); // 5 LOGs required for 1 PLANKS

	//  COAL and antything related to COAL
	public static COAL = new Resource('coal', 1.15);

	// Static methods
	static get values() {
		return [
			this.LOG,
			this.PLANKS,
			this.COAL,
		];
	}

	public static fromString(type: string) {
		const value = (this as any)[type];

		if(value) return value;

		throw new RangeError(
			`Illegal argument passed to fromString(): ${type} does to correspond to any instance of the enum ${(this as any).prototype.constructor.name}`
		);
	}

	/**
	 * 
	 * @param type The type of the resource
	 * @param baseValue The base amount of money you get when you sell this resource
	 */
	private constructor(
		public readonly type: string,
		public readonly baseValue: number,
	) {}

	// Public methods
	public toJson() {
		return this.type;
	}
}