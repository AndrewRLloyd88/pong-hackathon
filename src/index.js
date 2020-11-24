import Phaser from "phaser";
import MainMenu from "./scenes/MainMenu";
import Game from "./scenes/Game";
import WinScreen from "./scenes/WinScreen";

// Resolution setting for the game
const resolution = {
  width: 800,
  height: 600,
};

// Configuration for phaser
const config = {
  type: Phaser.AUTO,
  width: resolution.width,
  height: resolution.height,
  physics: {
    default: "arcade",
  },
  scene: [MainMenu, Game, WinScreen],
};

const game = new Phaser.Game(config);
