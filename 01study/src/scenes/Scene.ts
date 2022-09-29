
import { Container, InteractionEvent, Sprite } from "pixi.js";

export class Scene extends Container {
    private readonly screenWidth: number;
    private readonly screenHeight: number;
    // we promoted clampy to a member of the class
    private clampy: Sprite;

    constructor(screenWidth: number, screenHeight: number) {
        super();//Mandatoyr! This calls the superclass constructor.
        //see how members of the class need `this.`?
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        //How clampy is a class member,we will be able to use it in another methods!
        this.clampy = Sprite.from("clampy.png");

        this.clampy.anchor.set(0.5);
        this.clampy.x = this.screenWidth / 2;
        this.clampy.y = this.screenHeight / 2;
        this.addChild(this.clampy);

        this.clampy.on("clamp", onClampyClamp, this);

        this.clampy.once("clamp", onClampyClampOnce, this);

        // clampy.off("clamp", onClampyClamp); // This will remove the event!
        // somewhere, when the time is right... Fire the clamp!
        this.clampy.emit("clamp");
    }

}
// If you come from c++ this will mess you up: Functions can be declared after you used them.
function onClampyClamp() {
    console.log("clampy did clamp!");
}

function onClampyClampOnce() {
    console.log("this will only be called once and then removed!");
}

