/*Level 5
This will be the level played by the testers.
It has to call the Interface scene on top of it (Alexandre)
It has to import the functions from other scenes,
So that only the Level design aspect and local paramaters are present here
It has to import the weapons and modules chosen by the players in the lobby
*/

import LevelTemplate from "../scenes_templates/level_template.js";


class Mission01 extends LevelTemplate {
  constructor() {
    super("Mission01");
  }

  init(data) {
    this.mapTileset = data.mapTileset;
    this.mapTilesetImage = data.mapTilesetImage;
    this.data_holder = {
      gunAngle: 0,
      cameraPosX: 0,
      cameraPosY: 0,
      ammo: 99,
      enemiesNumber: 0,
      progress: 0,
    };
    this.musicVolume = data.musicVolume;
    this.fxVolume = data.fxVolume;
  };

  create() {
    console.log(this.musicVolume)
    const levelMap = this.add.tilemap("Testroom");
    const layers = this.loadMap(levelMap);
    this.loadPlayer(64, 0, layers);
    this.physics.add.collider(this.player, layers.calc_walls);
    const enemies = this.loadEnemies(layers.spawnPoints, layers.calc_walls);
    this.physics.add.collider(enemies, layers.calc_walls);
    this.loadGun(this.player.x, this.player.y);
    this.createCamera();
    this.playAmbientMusic();
    this.createLights();
    this.loadInterface();
    this.mouseMovements();
    this.mouseActions(layers, enemies);
  };
  update() {
    this.gunOrientation();
    this.generalPositioning();
  };
}
export default Mission01