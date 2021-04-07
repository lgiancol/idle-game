import Player from "../Player";
import Resource, { ResourceType } from "../resources/Resource";
import ResourceManager from "../resources/resource-managers/ResourceManager";

export default abstract class HomeManager {
	private player: Player;
	private _fuel: {startingAmount: number, remainingAmount: number}[]; // TODO: Turn this into a class Fuel or something
	private currentFuelIndex = -1;
	public totalRemaingFuel = 0;

	// Feezing variables
	private _isFeezing = false;
	private _currentFreezeTime = 0;

	public constructor(
		public homeType: string,
		private _acceptedResourceType: ResourceType,
		public fuelLimit: number,
		public fuelUseSpeed: number,
		private _freezeToDeathTime: number) {
			this.player = Player.getInstance();
			this._fuel = [];
			for(let i = 0; i < this.fuelLimit; i++) {
				this.addFuel();
			}
	}

	get acceptedFuelResource() {
		return this._acceptedResourceType;
	}

	get currentFuelLevel() {
		return this._fuel.length;
	}

	get freezeToDeathTime() {
		return this._freezeToDeathTime;
	}

	get freezeTimeReminaing() {
		return this._freezeToDeathTime - this._currentFreezeTime;
	}

	get isFrozen() {
		return this.freezeTimeReminaing == 0;
	}

	get canAddFuel() {
		return this.player.getResourceManager(this._acceptedResourceType).quantity > 0;
	}

	public addFuel() {
		let fuel = {
			// startingAmount: this._acceptedResourceType.energyUnits,
			// remainingAmount: this._acceptedResourceType.energyUnits
			startingAmount: 10,
			remainingAmount: 10
		} as {startingAmount: number, remainingAmount: number};

		if(this._fuel.length == this.fuelLimit) {
			const currentFuel = this._fuel[this.currentFuelIndex];
			currentFuel.remainingAmount = currentFuel.startingAmount;
		} else {
			this._fuel.push(fuel);
		}

		// this.totalRemaingFuel = Math.min(this.totalRemaingFuel + fuel.startingAmount, this.fuelLimit * this._acceptedResourceType.energyUnits);
		this.totalRemaingFuel = Math.min(this.totalRemaingFuel + fuel.startingAmount, this.fuelLimit * 10);

		if(this.currentFuelIndex == -1) {
            this.currentFuelIndex = this._fuel.length - 1;
        }
	}

	public update(delta: number) {
		this.updateFuel(delta);

		const deltaSecond = delta / 1000;
		if(this._isFeezing) {
			this._currentFreezeTime += deltaSecond;

			if(this._currentFreezeTime > this._freezeToDeathTime) this._currentFreezeTime = this.freezeToDeathTime;
		} else if(this._currentFreezeTime > 0) {
			this._currentFreezeTime -= deltaSecond;

			if(this._currentFreezeTime < 0) this._currentFreezeTime = 0;
		}
	}

	private updateFuel(delta: number) {
		if(this._fuel.length == 0) {
			this._isFeezing = true;
			return;
		}

		this._isFeezing = false;
		const deltaSecond = delta / 1000;
		let fuel = this._fuel[this.currentFuelIndex];
        let deltaFuelUsed = this.fuelUseSpeed * deltaSecond;
		this.totalRemaingFuel -= deltaFuelUsed;

        let newFuelAmount = fuel.remainingAmount - deltaFuelUsed;

		if(newFuelAmount > 0) {
			// We are good to just set it and go
            fuel.remainingAmount = newFuelAmount;
        } else {
			// We need to go into the next fuel resource if available
            this._fuel.splice(this.currentFuelIndex, 1);
            this.currentFuelIndex = this._fuel.length - 1;
            
            if(this.currentFuelIndex >= 0) {
				fuel = this._fuel[this.currentFuelIndex];
				let remainingFuelToRemove = newFuelAmount * -1; // Will be 0 or negative and we want it positive
				fuel.remainingAmount -= remainingFuelToRemove;
			}
        }

        if(this.currentFuelIndex == -1) {
            this.totalRemaingFuel = 0;
        }
	}
}