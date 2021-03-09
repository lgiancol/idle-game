import Resource from "../resources/Resource";
import Home from "./Home";

export default class Camp extends Home{
    public constructor() {
        super('Camp', 10, 1);
    }

    public usesResourceAsFuel(resource: Resource): boolean {
        return true;
    }
}