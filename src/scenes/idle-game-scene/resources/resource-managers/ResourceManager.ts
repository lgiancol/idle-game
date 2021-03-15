import Resource from "../Resource";
import ResourceCollector from "./resource-collector/ResourceCollector";
import ResourceSeller from "./resource-seller/ResourceSeller";

export default class ResourceManager {
	protected _resourceCollector: ResourceCollector = new ResourceCollector();
	protected _resourceSeller: ResourceSeller = new ResourceSeller();

	public constructor(public resourceType: string, public resource: Resource) {}

	get resourceCollector() {
		return this._resourceCollector;
	}

	get resourceSeller() {
		return this._resourceSeller;
	}

	public update(delta: number) {
		this.resourceCollector.update(delta);
	}

	public collectResource() {

	}

	public sellResource(amountToSell: number) {
		if(this.resourceCollector.quantity >= amountToSell) {
			this.resourceCollector.decreaseQuantity(amountToSell);
			return this.resourceSeller.sellResource(amountToSell);
		}

		return -1;
	}

	public hasMinimumOf(min: number) {
		return this.resourceCollector.quantity >= min;
	}
}