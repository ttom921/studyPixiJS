
class Keyboard {
    public static readonly state: Map<string, boolean>;
    public static initialize() {
        // the `.bind(this)` here isn't necesary as these functions won't use `this`!
        document.addEventListener("keydown", Keyboard.keyDown);
        document.addEventListener("keyup", Keyboard.keyUp);

    }
    private static keyDown(e: KeyboardEvent) {
        Keyboard.state.set(e.code, true);
    }
    private static keyUp(e: KeyboardEvent) {
        Keyboard.state.set(e.code, false);
    }
}