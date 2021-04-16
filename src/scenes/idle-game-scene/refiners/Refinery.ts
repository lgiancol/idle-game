import Resource from "../resources/Resource";
import RefineryItem from "./RefineryItem";

export default class Refinery {
	private _refineryItem: RefineryItem;

	public constructor(public readonly inputResource: Resource, public readonly outputResource: Resource) {
		this._refineryItem = new RefineryItem(inputResource, 5, outputResource);
	}

	get canRefine() {
		return this._refineryItem.canRefine;
	}

	get refinePercentage() {
		return this._refineryItem.percentComplete;
	}

	get refinedResourceCount() {
		return this._refineryItem.refinedCount;
	}

	get timeToRefine() {
		return this._refineryItem.timeToRefine;
	}

	public update(delta: number) {
		this._refineryItem.update(delta);
	}

	public addResource(resource: Resource, amountToAdd: number = 1) {
		if(this._refineryItem.addResource(resource, amountToAdd)) {
			return true;
		}

		return false;
	}

	public takeRefinedResource(refinedResource: Resource, amountToTake: number = -1) {
		return this._refineryItem.takeRefinedResource(refinedResource, amountToTake);

		return -1;
	}
}