enum Type {
	COLLECT_SPEED = 'collect_speed'
}
export default abstract class Upgrade {
	public constructor(public level: number, public name: string, public type: string, public cost: number) {}

	static get Type() {
		return Type;
	}
}