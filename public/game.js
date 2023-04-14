/*main game script for multiplayer
It will contain all preloads
It will be responsible for all server communications

*/

//global game parameters


import PreloadScene from './preload.js';
import LobbyScene from './scenes/lobby.js';
import Interface from './UI/interface.js';


const WIDTH = 1280;
const HEIGHT = 768;
const ZOOM_FACTOR = 3;
const socket = io();

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: ZOOM_FACTOR,
  leftTopCorner: {
    x: (WIDTH - (WIDTH / ZOOM_FACTOR)) / 2,
    y: (HEIGHT - (HEIGHT / ZOOM_FACTOR)) / 2
  }
}

const Scenes = [PreloadScene, LobbyScene, Interface];
const createScene = Scene => new Scene(SHARED_CONFIG) //A voir
const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: false }
    }
  },
  scene: initScenes()
};

new Phaser.Game(config);