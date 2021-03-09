import ResourceCollector from "../ResourceCollector";
import Log from "./Log";

export default class LogCollector extends ResourceCollector<Log> {
    public constructor() {
        super(new Log(), 0, 1);
    }
}