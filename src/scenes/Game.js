import Phaser from "phaser";
import mp3 from "../assets/Orbital Colossus.mp3";
import background from "../assets/scifi_platform_BG1.jpg";
import ball from "../assets/ball.png";
import paddle1 from "../assets/paddle1.png";
import paddle2 from "../assets/paddle2.png";
import bg from "../assets/bg.jpg";
import tiles from "../assets/scifi_platformTiles_32x32.png";
import star from "../assets/star.png";
import { accelerate, decelerate } from "../utils";

let paddleP1;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "game" });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image("bg", bg);
    this.load.image("paddle1", paddle1);

    this.load.image("star", star);
  },
  create: function create() {
    this.add.image(400, 300, "bg");
    this.add.image("paddle1", paddle1);

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

    paddleP1 = this.physics.add.image(700, 300, "paddle1");

    const processCollision = (paddleP1, star) => {
      // star.destroy();
      const starsLeft = stars.countActive();
      if (starsLeft === 0) {
        this.scene.start("winscreen");
      }
    };

    this.physics.add.collider(stars, paddleP1, processCollision, null, this);

    paddleP1.setBounce(1, 1);
    paddleP1.setCollideWorldBounds(true);
  },
  update: function () {
    const { velocity } = paddleP1.body;

    if (cursors.space.isDown) {
      const x = decelerate(velocity.x);
      const y = decelerate(velocity.y);
      paddleP1.setVelocity(x, y);
    }

    if (cursors.up.isDown) paddleP1.setVelocityY(accelerate(velocity.y, -1));
    if (cursors.right.isDown) paddleP1.setVelocityX(accelerate(velocity.x, 1));
    if (cursors.down.isDown) paddleP1.setVelocityY(accelerate(velocity.y, 1));
    if (cursors.left.isDown) paddleP1.setVelocityX(accelerate(velocity.x, -1));
  },
});
