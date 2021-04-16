export default class Resource {
	// Instances
	//  LOGs and anything related to LOGs
	public static LOG = new Resource('log', 1, 1.5, 1);
	public static PLANK = new Resource('plank', 6, 3, 3); // 5 LOGs required for 1 PLANK

	//  COAL and antything related to COAL
	public static COAL = new Resource('coal', 1.15, 5, 4);

	// Static methods
	static get values() {
		return [
			this.LOG,
			this.PLANK,
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
	 * @param timeToBreakDown The amount of time in seconds it will take to break down this resource in a refinery
	 * @param timeToBuild The amount of time in seconds it will take to build this resource in a refinery
	 */
	private constructor(
		public readonly type: string,
		public readonly baseValue: number,
		public readonly timeToBreakDown: number,
		public readonly timeToBuild: number,
	) {}

	// Public methods
	public toJson() {
		return this.type;
	}
}