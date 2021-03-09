import { IBurnableResource } from "./IResource";

export default abstract class Resource implements IBurnableResource {
    public constructor(private _name: string, private _sellPrice: number, private _burnDuration: number) {}

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