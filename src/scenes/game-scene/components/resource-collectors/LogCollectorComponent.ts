import ResourceCollector from "../../resources/ResourceCollector";
import ResourceCollectorComponent from "./ResourceCollectorComponent";

export default class LogCollectorComponent extends ResourceCollectorComponent {
    public constructor(tag: string, resourceCollector: ResourceCollector) {
        super(tag, resourceCollector)
    }
}