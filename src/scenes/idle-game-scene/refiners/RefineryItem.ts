import Resource from "../resources/Resource";

export default class RefineryItem extends Phaser.Events.EventEmitter {
	private currentTime = 0;
	private _toRefineCount = 0;
	private _refinedCount = 0;
	private _timeToRefine = -1;

	//  * @param timeToRefine The time in seconds it will take to refine all the resources required for 1 refined resource
	/**
	 * 
	 * @param resourceType The resource type that this refiner accepts
	 * @param numRequiredResources The number of resource required before the refiner will start working
	 * @param outputResource The resource type that this refiner will produce
	 * @param refinedResourceAmount The number of refined resources this refiner will produce
	 */
	public constructor(
		// public timeToRefine: number,
		public readonly inputResoruce: Resource,
		public readonly numRequiredResources: number,
		public readonly outputResource: Resource,
		public readonly refinedResourceAmount: number = 1
	) {
		super();

		this._timeToRefine = (this.inputResoruce.timeToBreakDown * this.numRequiredResources) + this.outputResource.timeToBuild; // TODO: Make this based off the resources input/output
	}

	get canRefine() {
		return this._toRefineCount >= this.numRequiredResources;
	}

	get refinedCount() {
		return this._refinedCount;
	}

	get percentComplete() {
		return this.currentTime / (this._timeToRefine * 1000);
	}

	get timeToRefine() {
		return this._timeToRefine;
	}

	public addResource(resource: Resource, amountToAdd: number = 1) {
		if(this.inputResoruce == resource) {
			this._toRefineCount += amountToAdd;
			return true;
		}

		return false;
	}

	public takeRefinedResource(refinedResource: Resource, amountToTake: number = 1) {
		if(this.outputResource == refinedResource) {
			if(amountToTake == -1) amountToTake = this._refinedCount;

			if(amountToTake <= this.refinedCount) {
				this._refinedCount -= amountToTake;
				return amountToTake;
			}
		}

		return -1;
	}

	public update(deltaTime: number) {
		if(this.canRefine) {
			this.currentTime += deltaTime;
	
			if(this.percentComplete >= 1) {
				this.onResourceRefined();
			}
		}
	}

	private onResourceRefined() {
		this._refinedCount += this.refinedResourceAmount;
		this._toRefineCount -= this.numRequiredResources;
		this.currentTime = 0;

		this.emit('refined', this.inputResoruce);
	}
}