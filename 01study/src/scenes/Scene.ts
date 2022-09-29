
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

        // No pixi here, All HTML DOM baby!
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));

    }
    private onKeyDown(e: KeyboardEvent): void {
        console.log("KeyDown event fired!", e);

        // Most likely, you will switch on this:
        // e.code // if you care about the physical location of the key
        // e.key // if you care about the character that the key represents
    }

    private onKeyUp(e: KeyboardEvent): void {
        console.log("KeyUp event fired!", e);

        // Most likely, you will switch on this:
        // e.code // if you care about the physical location of the key
        // e.key // if you care about the character that the key represents
    }
}

