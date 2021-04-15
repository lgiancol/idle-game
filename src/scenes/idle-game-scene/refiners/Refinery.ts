import Resource, { ResourceType } from "../resources/ResourceTypes";
import RefineryItem from "./RefineryItem";

export default class Refinery {
	private _refinerItems = [] as RefineryItem[];

	public constructor() {
		let refinerItem = new RefineryItem(1000, ResourceType.LOG, 5, ResourceType.PLANKS);
		refinerItem.on('refined', () => console.log('Resources To Refine Count: ', refinerItem.refinedCount));
		
		this._refinerItems.push(refinerItem);
	}

	public update(delta: number) {
		this._refinerItems.forEach((refinerItem: RefineryItem) => refinerItem.update(delta));
	}

	public addResource(resourceType: ResourceType, amountToAdd: number = 1) {
		for(let refinerItem of this._refinerItems) {
			if(refinerItem.addResource(resourceType, amountToAdd)) {
				return true;
			}
		}

		return false;
	}

	public takeRefinedResource(refinedResourceType: ResourceType, amountToTake: number = -1) {
		for(let refinerItem of this._refinerItems) {
			return refinerItem.takeRefinedResource(refinedResourceType, amountToTake);
		}

		return -1;
	}
}