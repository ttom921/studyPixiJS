
import { Container, Sprite, Ticker } from "pixi.js";
import { Group, Tween } from "tweedle.js";


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
        this.clampy.x = 0;//we start it at 0
        this.clampy.y = this.screenHeight / 2;
        this.addChild(this.clampy);

        //see this `this` thingy there? That is another way of binding the context!
        Ticker.shared.add(this.update, this);

        // See how these chains all togegher
        new Tween(this.clampy.scale).to({ x: 0.5, y: 0.5 }, 1000).repeat(Infinity).yoyo(true).start();

        // This is th sam code ,but unchained
        // const tweeny= new Tween(this.clampy.scale);
        // tweeny.to({x:0.5,y:0.5},1000);
        // tweeny.repeat(Infinity);
        // tweeny.yoyo(true);
        // tweeny.start();

    }
    private update(deltaTime: number): void {
        // you need to update a group for the tweens to do something!
        Group.shared.update();
    }
}