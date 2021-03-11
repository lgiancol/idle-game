import ResourceCollector from "../../resources/ResourceCollector";
import ResourceCollectorComponent from "./ResourceCollectorComponent";

export default class CoalCollectorComponent extends ResourceCollectorComponent {
    public constructor(tag: string, resourceCollector: ResourceCollector) {
        super(tag, resourceCollector)
    }
}