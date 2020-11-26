import Phaser from "phaser";
import MainMenu from "./scenes/MainMenu";
import Game from "./scenes/Game";
import P1wins from "./scenes/P1wins";
import P2wins from "./scenes/P2wins";
import Cpuwins from "./scenes/Cpuwins";
import P1OnlyMenu from "./scenes/P1OnlyMenu";
import TwoPlayerMenu from "./scenes/TwoPlayerMenu";
import TwoPlayergame from "./scenes/TwoPlayergame";

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
  scene: [
    MainMenu,
    P1OnlyMenu,
    TwoPlayerMenu,
    Game,
    TwoPlayergame,
    P1wins,
    P2wins,
    Cpuwins,
  ],
};

const game = new Phaser.Game(config);
