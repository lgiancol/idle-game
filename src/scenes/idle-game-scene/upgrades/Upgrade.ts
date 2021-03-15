export default abstract class Upgrade {
	public constructor(public level: number, public name: string, public type: string, public cost: number) {}
}