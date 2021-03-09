import IResourceQuantity from "./IResourceQuantity";

export default class ResourceQuantity implements IResourceQuantity {
    public quantity = 0;
    private trueQuantity = 0;

    public constructor() {}

    public addToQuantity(toAdd: number) {
        this.trueQuantity += toAdd;
        this.quantity = Math.floor(this.trueQuantity);
    }

    public removeFromQuantity(toRemove: number) {
        this.trueQuantity -= toRemove;
        this.quantity = Math.floor(this.trueQuantity);
    }
}