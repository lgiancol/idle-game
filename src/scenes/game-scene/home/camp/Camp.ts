import Log from "../../resources/log/Log";
import Resource from "../../resources/Resource";
import Home from "../Home";

export default class Camp extends Home{
    public constructor() {
        super('Camp', 3, 0.6);
    }

    public usesResourceAsFuel(resource: Resource): boolean {
        return resource instanceof Log;
    }
}