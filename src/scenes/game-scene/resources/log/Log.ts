import Resource from "../Resource";
import LogCollector from "./LogCollector";

export default class Log extends Resource {
    public constructor() {
        super('Log', 1, 1);
    }

    public createResourceCollector() {
        this.resourceCollector = new LogCollector();
    }
}