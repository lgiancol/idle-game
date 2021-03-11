import Resource from "../Resource";
import CoalCollector from "./CoalCollector";

export default class Coal extends Resource {
    public constructor() {
        super('Coal', 1.5, 10);
    }

    public createResourceCollector() {
        this.resourceCollector = new CoalCollector();
    }
}