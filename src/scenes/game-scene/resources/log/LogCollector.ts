import ResourceCollector from "../ResourceCollector";

export default class LogCollector extends ResourceCollector {
    public constructor() {
        super('Log', 0, 1);
    }
}