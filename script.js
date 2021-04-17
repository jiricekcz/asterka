import * as Canvasio from "./lib/canvasio/src/index.js";
const canvas = new Canvasio.Canvas({ preset: "fullscreen" });
const FPS = 60;
const ASTERKA_IMAGE = await Canvasio.Image.fromUrl("./resources/Asterka.png");
const keyState = {
    w: false, s: false, a: false, d: false
}
ASTERKA_IMAGE.resize(100, 200)
ASTERKA_IMAGE.crop({
    height: 500, width: 500, x: 600, y: 550
});
const PLAYER_TEXTURE = await Canvasio.Image.fromUrl("./resources/player.png");
PLAYER_TEXTURE.resize(30, 10);
var started = false;
setTimeout(() => {started = true;}, 3000)

class Enemy extends Canvasio.Sprite {
    constructor(texture) {
        super(canvas, texture);
        this.limitToCanvasBorders(100, 200);
        this.bounce = 3;
        this.friction = 0.95;
        this.x = 300;
        this.y = 300;
    }
    update() {
        this.accelerationX += Math.random() * .3 - .15;
        this.accelerationY += Math.random() * .3 - .15;
        if (Math.random() < 0.02) (this.accelerationY = 0, this.accelerationX = 0);
        this.draw();
    }
}

class Player extends Canvasio.Sprite {
    constructor() {
        super(canvas, PLAYER_TEXTURE);
        this.speed = 0.15;
        this.limitToCanvasBorders(30,10);
        this.bounce = 1;
        this.friction = 0.9999;
    }
    update() {
        if (keyState.w) this.velocityY -= this.speed;
        if (keyState.s) this.velocityY += this.speed;
        if (keyState.a) this.velocityX -= this.speed;
        if (keyState.d) this.velocityX += this.speed;
        this.draw();
    }
}
console.log(ASTERKA_IMAGE.getDrawType());

const enemy = new Enemy(ASTERKA_IMAGE);
const player = new Player();
function gameLoop() {
    canvas.clear();

    enemy.update();
    player.update();
}

setInterval(gameLoop, 1000 / FPS);
document.addEventListener("keydown", e => {
    keyState[e.key] = true;
});
document.addEventListener("keyup", e => {
    keyState[e.key] = false;
});