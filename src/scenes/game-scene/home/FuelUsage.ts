import IFuelResource from "./IFuelResource";

export default class FuelUsage {
    private fuel = [] as IFuelResource[];
    private currentFuelIndex = -1; // -1 means set when adding fuel
    private remainingFuel = 0;

    public constructor(private fuelLimit: number) {}

    public addFuel(amount: number, toAdd: IFuelResource) {
        for(let i = 0; i < amount; i++) {
            this.remainingFuel += toAdd.remainingFuel; // Will always be added FULL
            this.fuel.push(Object.assign({}, toAdd));
        }

        if(this.currentFuelIndex == -1) {
            this.currentFuelIndex = this.fuel.length - 1;
        }
    }

    public useFuel(delta: number) {
        if(this.fuel.length == 0) return;

        let deltaSecond = delta / 1000;

        let currentFuelResource = this.fuel[this.currentFuelIndex];
        let deltaFuelUsage = currentFuelResource.burnSpeed * deltaSecond;
        let newFuelAmount = currentFuelResource.remainingFuel - deltaFuelUsage;

        if(newFuelAmount <= 0) {
            // We need to go into the next fuel resource if available
            this.fuel.splice(this.currentFuelIndex, 1);
            this.currentFuelIndex = this.fuel.length - 1;
            
            if(this.currentFuelIndex > -1) {
                let fuelStillToRemove = newFuelAmount * -1; // Will be 0 or negative and we want it positive
    
                currentFuelResource = this.fuel[this.currentFuelIndex];
                currentFuelResource.remainingFuel -= fuelStillToRemove;
            }
        } else {
            // We are good to just set it and go
            currentFuelResource.remainingFuel = newFuelAmount;
        }
        this.remainingFuel -= deltaFuelUsage;

        if(this.currentFuelIndex == -1) {
            this.remainingFuel = 0;
        }
    }

    get currentFuelCount() {
        return this.fuel.length;
    }

    get totalRemainingPercentage() {
        let decimal = (this.remainingFuel / this.fuelLimit) * 100;
        return Math.round((decimal + Number.EPSILON) * 100) / 100;
    }
}