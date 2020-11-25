import Phaser, { Sound } from "phaser";
import mp3 from "../assets/Orbital Colossus.mp3";
import paddle1 from "../assets/paddle1.png";
import paddle2 from "../assets/paddle2.png";
import bg from "../assets/bg.jpg";
import ballimg from "../assets/ball.png";
import blip1 from "../assets/4390__noisecollector__pongblipf-4.wav";
import blip2 from "../assets/4391__noisecollector__pongblipf-5.wav";
import { accelerate, decelerate } from "../utils";

let paddleP1;
let paddleP2;
let cursors;
let ball;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "game" });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image("bg", bg);
    this.load.image("paddle1", paddle1);
    this.load.image("paddle2", paddle2);
    this.load.image("ballimg", ballimg);
    this.load.audio("blip1", blip1);
    this.load.audio("blip2", blip2);
  },
  create: function create() {
    this.add.image(400, 300, "bg");
    this.add.image("paddle1", paddle1);
    this.add.image("paddle2", paddle2);
    this.add.image("ballimg", ballimg);
    // this.add.audio("blip1", blip1);
    // this.add.audio("blip2", blip2);

    ball = this.physics.add.image(300, 300, "ballimg");

    ball.setBounceY(Phaser.Math.FloatBetween(0.5, 0.8));
    ball.setVelocityX(150 - Math.random() * 300);
    ball.setVelocityY(150 - Math.random() * 300);
    ball.setBounce(1, 1);
    ball.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    //declaring our P1 controlled paddle at X 10 and Y 300 (half of our canvas size)
    paddleP1 = this.physics.add.image(10, 300, "paddle1");

    //declaring our P2 controlled paddle at X 790 (right side of canvas) and Y 300 (half of our canvas size)
    paddleP2 = this.physics.add.image(790, 300, "paddle2");

    const processCollision = (paddleP1, ball) => {
      ball.setBounceY(Phaser.Math.FloatBetween(0.5, 0.8));
      ball.setBounce(1, 1);
      this.sound.play("blip2");
    };

    const processCollision2 = (paddleP2, ball) => {
      ball.setBounceY(Phaser.Math.FloatBetween(0.5, 0.8));
      ball.setBounce(1, 1);
      this.sound.play("blip1");
    };

    //adding collision detection for paddleP1 and the star
    this.physics.add.collider(ball, paddleP1, processCollision, null, this);

    //adding collision detection for paddleP2 and the star
    this.physics.add.collider(ball, paddleP2, processCollision2, null, this);

    //setting paddleP1 bounce
    paddleP1.setBounce(1, 1);
    //set worldcollisionbounds for P1 so it can't leave the playing field
    paddleP1.setCollideWorldBounds(true);

    //setting paddleP2 bounce
    paddleP2.setBounce(1, 1);
    //set worldcollisionbounds for P1 so it can't leave the playing field
    paddleP2.setCollideWorldBounds(true);
  },
  update: function () {
    let targetVelocity = ball.body.velocity.y;
    const { velocity } = paddleP1.body;

    //CPU logic - mimic the balls velocity on the Y axis
    paddleP2.body.setVelocity(ball.body.velocity.y);
    //move in the opposite X direction at half the speed (tweak for higher CPU difficulty)
    paddleP2.body.velocity.x = -ball.body.velocity.x * 0.5;
    //limit the max Y velocity
    paddleP2.body.maxVelocity.y = 250;
    //limit the max X velocity
    paddleP2.body.maxVelocity.X = 250;

    //update ball bounce per frame
    ball.setBounce(1, 1);

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
