export default abstract class HomeManager {
	public fuel: {startingAmount: number, useSpeed: number, remainingAmount: number}[]; // TODO: Turn this into a class Fuel or something
	private currentFuelIndex = -1;
	public totalRemaingFuel = 0;

	public constructor(public maxFuel: number) {
		this.fuel = [];
	}

	public addFuel(fuel: {startingAmount: number, useSpeed: number, remainingAmount: number}) {
		this.totalRemaingFuel += fuel.startingAmount;
		this.fuel.push(fuel);
		this.currentFuelIndex++; // Always use the last fuel resource added
	}

	public update(delta: number) {
		this.updateFuel(delta);
	}

	private updateFuel(delta: number) {
		if(this.fuel.length == 0) return;

		const deltaSecond = delta / 1000;
		let fuel = this.fuel[this.currentFuelIndex];
        let deltaFuelUsed = fuel.useSpeed * deltaSecond;
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