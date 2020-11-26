import Phaser from "phaser";

let graphics;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "cpuwinscreen" });
  },
  create: function () {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 800, 600);

    this.add.text(300, 300, "CPU Wins!", {
      font: "48px Gabriella",
      fill: "#0000FF",
      align: "center",
    });
  },
  update: function () {
    setTimeout(() => {
      this.scene.start("mainmenu");
    }, 3000);
  },
});
