import Resource from "../Resource";
import ResourceQuantity from "./resource-quantities/ResourceQuantity";

export default class ResourceManager<T extends Resource> {
	public resourceQuantity: ResourceQuantity = new ResourceQuantity();
	
	public manualCollectSpeed: number = 1;
	public autoCollectSpeed: number = 1;

	public constructor(public resourceType: string, public resource: T) {}

	public update(delta: number) {
		let deltaSecond = delta / 1000;
		this.resourceQuantity.increaseQuantity(this.autoCollectSpeed * deltaSecond);
	}
}