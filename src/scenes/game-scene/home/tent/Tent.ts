import Log from "../../resources/log/Log";
import Resource from "../../resources/Resource";
import Home from "../Home";

export default class Tent extends Home{
    public constructor() {
        super('Tent', 5, 0.75);
    }

    public usesResourceAsFuel(resource: Resource): boolean {
        return resource instanceof Log;
    }
}