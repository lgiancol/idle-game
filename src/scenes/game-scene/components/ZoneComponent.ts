import GameComponent from "../../../ui/GameComponent";

export default abstract class ZoneComponent<T> extends GameComponent {
    public constructor(tag: string) {
        super(tag);
    }

    public abstract addToZone(toAdd: T);
}