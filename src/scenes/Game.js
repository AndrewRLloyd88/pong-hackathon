import Phaser from "phaser";
import mp3 from "../assets/Orbital Colossus.mp3";
import background from "../assets/bg.jpg";
import bg from "../assets/bg.jpg";
import tiles from "../assets/sprites.png";
import star from "../assets/star.png";
import { accelerate, decelerate } from "../utils";

let paddle;
let paddle2;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "game" });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image("background", bg);

    this.load.spritesheet("tiles", tiles, {
      frameWidth: 40,
      frameHeight: 150,
    });

    this.load.image("star", star);
  },
  create: function create() {
    this.add.image(400, 300, "background");

    //all for stars which we're going to replace with ball
    const stars = this.physics.add.group({
      key: "star",
      repeat: 0,
      setScale: { x: 0.2, y: 0.2 },
      setXY: { x: 400, y: 300 },
    });

    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setVelocityX(150 - Math.random() * 300);
      child.setVelocityY(150 - Math.random() * 300);
      child.setBounce(1, 1);
      child.setCollideWorldBounds(true);
    });

    cursors = this.input.keyboard.createCursorKeys();

    //paddle1
    paddle = this.physics.add.image(800, 300, "tiles", 15);
    //paddle2
    paddle2 = this.physics.add.image(600, 100, "tiles", 15);

    const processCollision = (paddle, star) => {
      // star.destroy();
      const starsLeft = stars.countActive();
      if (starsLeft === 0) {
        this.scene.start("winscreen");
      }
    };

    //this line adds the collision for paddle - ball
    this.physics.add.collider(stars, paddle, processCollision, null, this);

    paddle.setBounce(0.5, 0.5);
    paddle.setCollideWorldBounds(true);
  },
  update: function () {
    const { velocity } = paddle.body;

    if (cursors.space.isDown) {
      const x = decelerate(velocity.x);
      const y = decelerate(velocity.y);
      paddle.setVelocity(x, y);
    }

    if (cursors.up.isDown) paddle.setVelocityY(accelerate(velocity.y, -1));
    if (cursors.right.isDown) paddle.setVelocityX(accelerate(velocity.x, 1));
    if (cursors.down.isDown) paddle.setVelocityY(accelerate(velocity.y, 1));
    if (cursors.left.isDown) paddle.setVelocityX(accelerate(velocity.x, -1));
  },
});
