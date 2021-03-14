import Resource from "../Resource";
import ResourceCollector from "./resource-collector/ResourceCollector";

export default class ResourceManager<T extends Resource> {
	public resourceCollector: ResourceCollector = new ResourceCollector();

	public constructor(public resourceType: string, public resource: T) {}

	public update(delta: number) {
		this.resourceCollector.update(delta);
	}

	public hasMinimumOf(min: number) {
		return this.resourceCollector.quantity >= min;
	}
}