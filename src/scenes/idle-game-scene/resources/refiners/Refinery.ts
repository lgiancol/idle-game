import Resource from "../ResourceTypes";
import RefineryItem from "./RefineryItem";

export default class Refinery {
	private _refinerItems = [] as RefineryItem[];

	public constructor() {
		let refinerItem = new RefineryItem(1000, Resource.LOG, 5, Resource.PLANKS);
		refinerItem.on('refined', () => console.log('Resources To Refine Count: ', refinerItem.refinedCount));
		
		this._refinerItems.push(refinerItem);
	}

	public update(delta: number) {
		this._refinerItems.forEach((refinerItem: RefineryItem) => refinerItem.update(delta));
	}

	public addResource(resource: Resource, amountToAdd: number = 1) {
		for(let refinerItem of this._refinerItems) {
			if(refinerItem.addResource(resource, amountToAdd)) {
				return true;
			}
		}

		return false;
	}

	public takeRefinedResource(refinedResource: Resource, amountToTake: number = -1) {
		for(let refinerItem of this._refinerItems) {
			return refinerItem.takeRefinedResource(refinedResource, amountToTake);
		}

		return -1;
	}
}