import Resource from "../Resource";
import ResourceCollector from "./resource-collector/ResourceCollector";
import ResourceSeller from "./resource-seller/ResourceSeller";

export default class ResourceManager<T extends Resource> {
	protected _resourceCollector: ResourceCollector = new ResourceCollector();
	protected _resourceSeller: ResourceSeller = new ResourceSeller();

	public constructor(public resourceType: string, public resource: T) {}

	get resourceCollector() {
		return this._resourceCollector;
	}

	get resourceSeller() {
		return this._resourceSeller;
	}

	public update(delta: number) {
		this.resourceCollector.update(delta);
	}

	public hasMinimumOf(min: number) {
		return this.resourceCollector.quantity >= min;
	}
}