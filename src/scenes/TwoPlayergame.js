import Phaser, { Sound } from "phaser";
import mp3 from "../assets/Orbital Colossus.mp3";
import paddle1 from "../assets/paddle1.png";
import paddle2 from "../assets/paddle2.png";
import bg from "../assets/bg.jpg";
import ballimg from "../assets/ball.png";
import blip1 from "../assets/4390__noisecollector__pongblipf-4.wav";
import blip2 from "../assets/4391__noisecollector__pongblipf-5.wav";
import { accelerate, decelerate } from "../utils";
import { reset } from "chalk";

let paddleP1;
let paddleP2;
let cursors;
let ball;
let score1_text;
let score2_text;
let p1Text;
let cpuText;
let ball_launched;
let ball_velocity;
let p1scored = false;
let p2scored = false;
let firstLaunch = true;
let keys;

let score1;
let score2;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "2pgame" });
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

    //set scores
    score1 = 0;
    score2 = 0;

    //control our ball launched state
    ball_launched = false;
    ball_velocity = 400;

    //draw scores
    score1_text = this.add.text(128, 10, "0", {
      font: "64px Gabriella",
      fill: "#FF0000",
      align: "center",
    });

    score2_text = this.add.text(672, 10, "0", {
      font: "64px Gabriella",
      fill: "#0000FF",
      align: "center",
    });

    //draw player respective text
    p1Text = this.add.text(40, 20, "P1:", {
      font: "48px Gabriella",
      fill: "#FF0000",
      align: "center",
    });

    cpuText = this.add.text(550, 20, "CPU:", {
      font: "48px Gabriella",
      fill: "#0000FF",
      align: "center",
    });

    ball = this.physics.add.image(100, 300, "ballimg");
    ball.setScale(1.5, 1.5);
    ball.setBounce(1, 1);

    ball.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    //declaring our P1 controlled paddle at X 10 and Y 300 (half of our canvas size)
    paddleP1 = this.physics.add.image(10, 300, "paddle1");
    // paddleP1.body.immovable = true;

    //declaring our P2 controlled paddle at X 790 (right side of canvas) and Y 300 (half of our canvas size)
    paddleP2 = this.physics.add.image(790, 300, "paddle2");
    // paddleP2.body.immovable = true;

    const processCollision = (paddleP1, ball) => {
      // ball.setBounce(1, 1);
      this.sound.play("blip2");
    };

    const processCollision2 = (paddleP2, ball) => {
      // ball.setBounce(1, 1);
      this.sound.play("blip1");
    };

    //adding collision detection for paddleP1 and the star
    this.physics.add.collider(ball, paddleP1, processCollision);

    //adding collision detection for paddleP2 and the star
    this.physics.add.collider(ball, paddleP2, processCollision2);
    this.physics.add.collider(paddleP1, paddleP2);

    //setting paddleP1 bounce
    paddleP1.setCollideWorldBounds(true);

    //setting paddleP2 bounce
    paddleP2.setCollideWorldBounds(true);
  },
  update: function () {
    const launch_ball = () => {
      if (!ball_launched) {
        paddleP1.body.maxVelocity.x = 0;
        paddleP1.body.maxVelocity.y = 0;
        paddleP2.body.maxVelocity.x = 0;
        paddleP2.body.maxVelocity.y = 0;
        if (cursors.right.isDown && p2scored) {
          ball.setBounceY(Phaser.Math.FloatBetween(0.5, 0.9));
          ball.setVelocityX(100);
          ball.setVelocityY(150 - Math.random() * 400);
          paddleP1.body.maxVelocity.x = 250;
          paddleP1.body.maxVelocity.y = 250;
          paddleP2.body.maxVelocity.x = 250;
          paddleP2.body.maxVelocity.y = 250;
          p2scored = false;
          return (ball_launched = true);
        }

        if (cursors.right.isDown && firstLaunch) {
          ball.setBounceY(Phaser.Math.FloatBetween(0.5, 0.9));
          ball.setVelocityX(100);
          ball.setVelocityY(150 - Math.random() * 400);
          paddleP1.body.maxVelocity.x = 250;
          paddleP1.body.maxVelocity.y = 250;
          paddleP2.body.maxVelocity.x = 250;
          paddleP2.body.maxVelocity.y = 250;
          firstLaunch = false;
          return (ball_launched = true);
        }

        if (this.keys.left.isDown && p1scored) {
          p1scored = false;
          ball.setBounceY(Phaser.Math.FloatBetween(0.5, 0.9));
          ball.setVelocityX(-100);
          ball.setVelocityY(150 - Math.random() * 400);
          paddleP1.body.maxVelocity.x = 250;
          paddleP1.body.maxVelocity.y = 250;
          paddleP2.body.maxVelocity.x = 250;
          paddleP2.body.maxVelocity.y = 250;
          return (ball_launched = true);
        }
      }
    };

    const checkWin = () => {
      if (score1 === 7) {
        this.scene.start("p1winscreen");
      }
      if (score2 === 7) {
        this.scene.start("p2winscreen");
      }
      return;
    };

    checkWin();
    launch_ball();
    let paddleP2Velocityx = 0;
    let paddleP2Velocityy = 0;
    const { velocity } = paddleP1.body;
    //setting score text to be value of our scores
    score1_text.text = score1;
    score2_text.text = score2;

    //this function resets the playfield if P2 scores
    const resetSceneWhenP2Scores = () => {
      let x = 0;
      let y = 0;
      //reset the paddles position
      paddleP1.body.x = 10;
      paddleP1.body.y = 300;
      paddleP2.body.x = 790;
      paddleP2.body.y = 300;
      //set players velocity to 0,0
      paddleP1.setVelocity(x, y);
      // paddleP2.body.velocity = 0;
      //reset the balls position
      ball.body.x = 100;
      ball.body.y = 300;
      //set balls velocity to 0,0
      ball.setVelocity(0, 0);
    };

    //this function resets the playfield if P1 scores
    const resetSceneWhenP1Scores = () => {
      let x = 0;
      let y = 0;
      //reset the paddles position
      paddleP1.body.x = 10;
      paddleP1.body.y = 300;
      paddleP2.body.x = 790;
      paddleP2.body.y = 300;
      //set players velocity to 0,0
      paddleP1.setVelocity(x, y);
      // paddleP2.body.velocity = 0;
      //reset the balls position
      ball.body.x = 700;
      ball.body.y = 300;
      //set balls velocity to 0,0
      ball.setVelocity(0, 0);
    };

    // check to see if the ball collides with left or right
    if (ball.body.blocked.left) {
      score2++;
      resetSceneWhenP2Scores();
      p2scored = true;
      ball_launched = false;
    } else if (ball.body.blocked.right) {
      score1++;
      resetSceneWhenP1Scores();
      p1scored = true;
      ball_launched = false;
    }

    // this.scene.restart();
    if (cursors.space.isDown) {
      const x = decelerate(velocity.x);
      const y = decelerate(velocity.y);
      paddleP1.setVelocity(x, y);
    }

    if (cursors.up.isDown) paddleP1.setVelocityY(accelerate(velocity.y, -1));
    if (cursors.right.isDown) paddleP1.setVelocityX(accelerate(velocity.x, 1));
    if (cursors.down.isDown) paddleP1.setVelocityY(accelerate(velocity.y, 1));
    if (cursors.left.isDown) paddleP1.setVelocityX(accelerate(velocity.x, -1));

    if (this.keys.up.isDown) paddleP2.setVelocityY(accelerate(0, -15));
    if (this.keys.right.isDown) paddleP2.setVelocityX(accelerate(0, 15));
    if (this.keys.down.isDown) paddleP2.setVelocityY(accelerate(0, 15));
    if (this.keys.left.isDown) paddleP2.setVelocityX(accelerate(0, -15));
  },
});
