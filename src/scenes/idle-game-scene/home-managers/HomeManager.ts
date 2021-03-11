import ResourceManager from "../resource-managers/ResourceManager";

export default abstract class HomeManager {
	public fuel: {startingAmount: number, remainingAmount: number}[]; // TODO: Turn this into a class Fuel or something
	private currentFuelIndex = -1;
	public totalRemaingFuel = 0;

	public constructor(public homeType: string, public fuelResourceManager: ResourceManager, public fuelLimit: number, public fuelUseSpeed: number) {
		this.fuel = [];
	}

	public addFuel() {
		// There's not enough of the fuel resource collected to actually use
		//  || The fuel for the home is already at capacity
		if(this.fuelResourceManager.resourceQuantity.quantity < 1 || this.fuel.length == this.fuelLimit) return;

		let fuel = {
			startingAmount: this.fuelResourceManager.energyUnits,
			remainingAmount: this.fuelResourceManager.energyUnits
		} as {startingAmount: number, remainingAmount: number};
		this.fuelResourceManager.resourceQuantity.decreaseQuantity(1);

		this.totalRemaingFuel += fuel.startingAmount;
		this.fuel.push(fuel);

		if(this.currentFuelIndex == -1) {
            this.currentFuelIndex = this.fuel.length - 1;
        }
	}

	public update(delta: number) {
		this.updateFuel(delta);
	}

	private updateFuel(delta: number) {
		if(this.fuel.length == 0) return;

		const deltaSecond = delta / 1000;
		let fuel = this.fuel[this.currentFuelIndex];
        let deltaFuelUsed = this.fuelUseSpeed * deltaSecond;
		this.totalRemaingFuel -= deltaFuelUsed;

        let newFuelAmount = fuel.remainingAmount - deltaFuelUsed;

		if(newFuelAmount > 0) {
			// We are good to just set it and go
            fuel.remainingAmount = newFuelAmount;
        } else {
			// We need to go into the next fuel resource if available
            this.fuel.splice(this.currentFuelIndex, 1);
            this.currentFuelIndex = this.fuel.length - 1;
            
            if(this.currentFuelIndex >= 0) {
				fuel = this.fuel[this.currentFuelIndex];
				let remainingFuelToRemove = newFuelAmount * -1; // Will be 0 or negative and we want it positive
				fuel.remainingAmount -= remainingFuelToRemove;
			}
        }

        if(this.currentFuelIndex == -1) {
            this.totalRemaingFuel = 0;
        }
	}
}