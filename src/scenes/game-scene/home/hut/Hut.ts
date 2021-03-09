import Log from "../../resources/log/Log";
import Resource from "../../resources/Resource";
import Home from "../Home";

export default class Hut extends Home{
    public constructor() {
        super('Hut', 8, 0.9);
    }

    public usesResourceAsFuel(resource: Resource): boolean {
        return resource instanceof Log;
    }
}