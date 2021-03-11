const Type = {
	COLLECT_SPEED: 'collect_speed'
}
export default abstract class Upgrade<T> {
	public constructor(public level: number, public name: string) {}

	static get Type() {
		return Type;
	}
}