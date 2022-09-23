//import { BlurFilter } from "@pixi/filter-blur";
import { Application, Container, Graphics, Point, Sprite, TextStyle, Text, BitmapText, BitmapFont, ParticleContainer, Texture } from "pixi.js";
import * as particleSettings from "./emitter.json";
import * as particles from '@pixi/particle-emitter';
const app = new Application({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x6495ed,
    width: 640,
    height: 480,
});

// const clampy: Sprite = Sprite.from("clampy.png");

// clampy.anchor.set(0.5);

// // setting it to "the middle of the screen
// clampy.x = app.screen.width / 2;
// clampy.y = app.screen.height / 2;

// app.stage.addChild(clampy);

const particleContainer = new ParticleContainer();
app.stage.addChild(particleContainer);

const emitter = new particles.Emitter(particleContainer,
    particles.upgradeConfig(particleSettings, [Texture.from("particle.png")])
);
emitter.autoUpdate = true; // If you keep it false, you have to update your particles yourself.
emitter.updateSpawnPos(200, 100);
emitter.emit = true;




