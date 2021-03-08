export default class StoreUtils {
    public static logFn() {
        return Math.log;
    }

    public static exponentialFn() {
        return this.myExponentionFn;
    }

    private static myExponentionFn(level: number) {
        return Math.pow(level, 2);
    }
}