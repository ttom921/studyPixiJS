import { Container, Sprite, Ticker } from "pixi.js";


export class Scene extends Container {
    private readonly screenWidth: number;
    private readonly screenHeight: number;
    // we promoted clampy to a member of the class
    private clampy: Sprite;
    private clampyVelocity: number = 5;
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
        //If you want,you cna do ite the bind way
        //Tick.shared.add(this.update.bind(this));

    }
    private update(deltaTime: number): void {
        this.clampy.x = this.clampy.x + this.clampyVelocity * deltaTime;
        if (this.clampy.x > this.screenWidth) {
            // Woah there clampy, com back inside the screen!
            this.clampy.x = 0;
        }
    }
}