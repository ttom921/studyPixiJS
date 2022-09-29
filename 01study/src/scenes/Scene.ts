
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

        //events that begin with "pointer" are touch + mouse
        this.clampy.on("pointertap", this.onClicky, this);

        //This only works with a mouse
        //this.clampy.on("click",this.onClicky,this);

        //This only work with touch
        this.clampy.on("tap", this.onClicky, this);

        //Super import or the object will never receive mouse events!
        this.clampy.interactive = true;

    }
    private onClicky(e: InteractionEvent): void {
        console.log("You interacted with Clampy!");
        console.log("The data of your interaction is super interesting", e);

        //Global position of the interaction
        //e.data.global

        // local (indide clampy) position of the interaction
        //e.data.getLocalPosition(this.clampy);
        //Rember Clampy hsa the 0,0 in its center because we set the anchor to 0.5!
    }
}

