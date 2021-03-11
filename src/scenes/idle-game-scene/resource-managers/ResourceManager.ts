import ResourceQuantity from "./resource-quantities/ResourceQuantity";

export default class ResourceManager {
	public resourceQuantity: ResourceQuantity = new ResourceQuantity();
	
	public manualCollectSpeed: number = 1;
	public autoCollectSpeed: number = 0;

	public constructor(public resourceType: string, public energyUnits: number) {}

	public update(delta: number) {
		let deltaSecond = delta / 1000;
		this.resourceQuantity.increaseQuantity(this.autoCollectSpeed * deltaSecond);
	}
}