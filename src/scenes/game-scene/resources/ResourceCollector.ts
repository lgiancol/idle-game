import IResourceCollector from "./IResourceCollector";
import ResourceQuantity from "./ResourceQuantity";

export default abstract class ResourceCollector implements IResourceCollector{
    private _resourceQuantity: ResourceQuantity;

    public constructor(public resourceName: string, private _collectSpeed: number, private _clickAmount: number) {
        this._resourceQuantity = new ResourceQuantity();
    }

    get resourceQuantity() {
        return this._resourceQuantity;
    }

    get collectSpeed() {
        return this._collectSpeed;
    }

    get clickAmount() {
        return this._clickAmount;
    }
}