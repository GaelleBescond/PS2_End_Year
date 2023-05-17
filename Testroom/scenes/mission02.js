import LevelTemplate from "../scenes_templates/level_template.js";
class Mission02 extends LevelTemplate {
  constructor() {
    super("Mission02");
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
    this.chosenGun = 0;
    this.canSwap = true;
  };

  create() {
    const levelMap = this.add.tilemap("Mission01");
    const layers = this.loadMap(levelMap);
    this.loadPlayer(64, 0, 'player');
    this.physics.add.collider(this.player, layers.calc_walls);
    const enemies = this.loadEnemies(layers.enemy_SpawnPoints, layers.calc_walls);
    this.physics.add.collider(enemies, layers.calc_walls);
    this.mouseActions(layers, enemies);
    this.loadGun(this.player.x, this.player.y);
    this.createCamera();
    this.playAmbientMusic();
    this.loadInterface();
    this.mouseMovements();
    this.cursors = this.input.keyboard.createCursorKeys();
  };

  update() {
    const eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    const qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    if ((eKey.isDown || qKey.isDown) && this.canSwap) {
      this.canSwap = false;
      if (eKey.isDown) {
        if (this.chosenGun < 2) {
          this.chosenGun += 1;
          this.gun.destroy();
          this.loadGun(this.player.x, this.player.y)

        } else {
          this.chosenGun = 2;
        }
      }
      if (qKey.isDown) {
        if (this.chosenGun > 0) {
          this.chosenGun -= 1;
          this.gun.destroy();
          this.loadGun(this.player.x, this.player.y)
        } else {
          this.chosenGun = 0;
        }
      }
      this.time.delayedCall(200, () => {
        this.swapCooldown();
      });
    };
    this.gunOrientation();
    this.generalPositioning();
    this.updateCamera();
  }
  swapCooldown() {
    this.canSwap = true;
  }

}
export default Mission02