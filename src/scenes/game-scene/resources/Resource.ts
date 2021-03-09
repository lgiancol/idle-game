import { IBurnableResource } from "./IResource";
import ResourceCollector from "./ResourceCollector";

export default abstract class Resource implements IBurnableResource {
    public resourceCollector: ResourceCollector;

    public constructor(private _name: string, private _sellPrice: number, private _burnDuration: number) {
        this.createResourceCollector();
    }

    public abstract createResourceCollector();

    public update(delta: number) {
        this.resourceCollector.update(delta);
    }

    get name() {
        return this._name;
    }

    get sellPrice() {
        return this._sellPrice;
    }

    get burnDuration() {
        return this._burnDuration;
    }
}