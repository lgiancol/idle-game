import Resource from "../Resource";
import RefineryItem from "./RefineryItem";

export default class Refinery {
	private _refineryItem: RefineryItem;

	public constructor(public readonly resourceAccepted: Resource, public readonly resourceRefined: Resource) {
		this._refineryItem = new RefineryItem(10, resourceAccepted, 5, resourceRefined);
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