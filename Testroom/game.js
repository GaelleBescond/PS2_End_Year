/*main game script for multiplayer
It will be responsible for all server communications
*/

//global game parameters

import PreloadScene from './scenes/preload.js';
import TestRoom from './scenes/testroom.js';
import Interface from './UI/interface.js';
import MainMenu from './UI/mainMenu.js';


const WIDTH = 1280;
const HEIGHT = 768;
const ZOOM_FACTOR = 3;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: ZOOM_FACTOR,
  leftTopCorner: {
    x: (WIDTH - (WIDTH / ZOOM_FACTOR)) / 2,
    y: (HEIGHT - (HEIGHT / ZOOM_FACTOR)) / 2
  }
}

const Scenes = [PreloadScene, TestRoom, Interface, MainMenu];
const createScene = Scene => new Scene(SHARED_CONFIG) //A voir
const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    },
  },
  scene: initScenes()
};

new Phaser.Game(config);