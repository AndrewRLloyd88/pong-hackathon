import Phaser from "phaser";
import phaserPong from "../assets/phaserPong.png";

let graphics;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "mainmenu" });
  },
  preload: function preload() {
    this.load.image("logo", phaserPong);
  },
  create: function () {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 800, 600);

    this.add.image(390, 100, "logo");

    this.add.text(200, 300, "Press 1 for a 1 player game and a CPU.");
    this.add.text(250, 330, "Press 2 for a 2 player game");

    this.add.text(180, 525, "A Pong clone created for Mintbean.io Hackathon");
    this.add.text(
      170,
      550,
      "By Andrew Lloyd https://github.com/andrewrlloyd88"
    );
  },
  update: function () {
    let one = this.input.keyboard.addKey("ONE"); // Get key object
    let two = this.input.keyboard.addKey("TWO"); // Get key object

    if (Phaser.Input.Keyboard.JustDown(one)) {
      this.scene.start("1pmenu");
    }
    if (Phaser.Input.Keyboard.JustDown(two)) {
      this.scene.start("2pmenu");
    }
  },
});
