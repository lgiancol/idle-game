import { IBurnableResource } from "./IResource";
import ResourceCollector from "./ResourceCollector";

export default abstract class Resource implements IBurnableResource {
    public resourceCollector: ResourceCollector;

    public constructor(private _name: string, private _sellPrice: number, private _fuelAmount: number) {
        this.createResourceCollector();
    }

    public abstract createResourceCollector();

    get name() {
        return this._name;
    }

    get sellPrice() {
        return this._sellPrice;
    }

    get fuelAmount() {
        return this._fuelAmount;
    }
}