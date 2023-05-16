/*Lobby
Players are supposed to meet, and choose what role they want to pick (driver, shooter).
Then they will position themselves in front the different modules they want to equip for their roles.
Once they are ready, they press the ready button.
The next level can then begin.
*/
import Player from "../../entities/player.js";
import Rifle from "../../entities/gun_rifle.js";
import Sniper from "../../entities/gun_sniper.js";
import Mortar from "../../entities/gun_mortar.js";
import Enemy from "../../entities/enemy.js";

class TestRoom extends Phaser.Scene {
  constructor() {
    super({
      key: "TestRoom",
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
          gravity: { y: 800 }
        }
      },
      render: {
        pipeline: 'Light2D'
      }
    });

  }
  init(data) {
    this.mapName = data.mapName;
    this.mapTileset = data.mapTileset;
    this.mapTilesetImage = data.mapTilesetImage
  };


  create() {
    const levelMap = this.add.tilemap("testroom");
    const layers = this.loadMap(levelMap);
    this.playAmbientMusic();
    this.player = new Player(this, 64, 0, 'player').setScale(0.55).setSize(150, 450, 50, 0);
    this.physics.add.collider(this.player, layers.calc_walls);
    this.gun = new Rifle(this, this.player.x, this.player.y - 48).setScale(0.07);
    const enemies = this.createEnemies(layers.spawnPoints, layers.calc_walls);
    this.physics.add.collider(enemies, layers.calc_walls);
    this.createLights();
    this.createCamera();
    //variables storage (for an easier later use)
    this.data_holder = {
      gunAngle: 0,
      cameraPosX: 0,
      cameraPosY: 0,
      ammo: this.gun.ammunition,
      enemiesNumber: 0,
      progress: 0
    }
    this.mouseMovements();
    this.mouseActions(layers, enemies);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.loadInterface();
  };

  update() {
    const gKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
    //Gravity tool
    if (gKey.isDown) {
      if ((this.player.body.velocity.x && this.player.body.velocity.y) != 0) {
        if (this.player.body.velocity.x > 0) {
          this.player.body.acceleration.x -= 10;
        } else if (this.player.body.velocity.x < 0) {
          this.player.body.acceleration.x += 10;
        }
      } else {
        this.physics.world.gravity.y = 2600;
      }
    }
    else {
      this.physics.world.gravity.y = 400;
    };
    //camera positioning
    this.cameraFocal.setPosition(this.player.x + (this.data_holder.cameraPosX) * 0.7, this.player.y + (this.data_holder.cameraPosY) * 0.7)

    //mouse aiming and updated location for the gun
    this.gun.setRotation(this.data_holder.gunAngle)
    if (this.data_holder.cameraPosX > 0) {
      this.gun.x = this.player.x + 5
    }
    else if (this.data_holder.cameraPosX < 0) {
      this.gun.x = this.player.x - 5

    }
    this.gun.y = this.player.y - 5
    this.playerLight.setPosition(this.gun.x, this.gun.y);
    //data export for facing animations
    this.gunOrientation();
  }

  loadMap(levelMap) {
    this.skyparallax = this.add.tileSprite(0, 0, 1600, 1600, "background").setScale(2);
    this.skyparallax.setOrigin(0, 0).setScrollFactor(0.2).setTint(0x555555);
    const tileset = levelMap.addTilesetImage("Tileset_testroom", "tileset_image");
    const calc_terrain = levelMap.createLayer("Background", tileset);
    const calc_walls = levelMap.createLayer("Walls", tileset)
    //calc_walls.setPipeline('Light2D');
    // calc_terrain.setPipeline('Light2D');
    const spawnPoints = levelMap.getObjectLayer("Spawn");
    calc_walls.setCollisionByProperty({ isSolid: true });
    return { spawnPoints, calc_walls, calc_terrain, tileset }

  }

  createCamera() {
    //set camera between player and mouse (average coordinates)
    this.cameraFocal = this.physics.add.sprite(this.player.x, this.player.y);
    this.cameraFocal.body.setAllowGravity(false);
    this.cameras.main.startFollow(this.cameraFocal);
    this.cameras.main.setZoom(0.55);
  }

  createEnemies(layer, calc_walls) {
    const enemies = this.physics.add.group();
    layer.objects.forEach(spawn => {
      console.log("spawn");
      let enemy = null;
      enemy = new Enemy(this, spawn.x, spawn.y, 'enemy').setScale(0.15);
      enemies.add(enemy)
      this.physics.add.collider(enemy)
    })
    return enemies;
  }

  mouseMovements() {
    this.input.on('pointermove', function (pointer) {
      this.data_holder.cameraPosX = pointer.x - 1280 / 2;
      this.data_holder.cameraPosY = pointer.y - 768 / 2;
      this.data_holder.gunAngle = Phaser.Math.Angle.Between(this.gun.x, this.gun.y, this.cameraFocal.x, this.cameraFocal.y);
      //console.log(this.data_holder)
      this.events.emit('updateUI', this.data_holder);
    }, this);
  }

  mouseActions(layers, enemies) {
    this.input.on('pointerdown', function (pointer) {
      //console.log(this.gun.weaponCanShoot, this.data_holder.ammo)
      if (this.gun.weaponCanShoot && this.data_holder.ammo > 0) {
        this.shootBullet(this.gun.x, this.gun.y, this.data_holder.gunAngle, layers, enemies);
        for (let i = 0; i < this.gun.projectilesPerShoot; i++) {
          this.time.delayedCall(100 * i, () => {
            this.shootBullet(this.gun.x, this.gun.y, this.data_holder.gunAngle, layers, enemies);
          });
        }
      }
      if (this.gun.weaponCanShoot && this.data_holder.ammo <= 0) {
        this.sound.play("empty_gun")
      }
    }, this);
  }

  playAmbientMusic() {
    this.sound.play("fleet", { volume: 0.35 });
  }

  getSpawnCoordinates(layer) {
    const spawnPoints = layer.objects;
    return {
      start: spawnPoints[0],
      end: spawnPoints[1]
    }
  }

  shootBullet(x, y, angle, layers, enemies) {
    this.data_holder.ammo -= 3;
    this.gun.weaponCanShoot = false;
    this.bullet = this.physics.add.sprite(x, y, 'bullet')
    this.physics.add.collider(this.bullet, layers.calc_walls, this.destroy, null, this)
    this.physics.add.collider(this.bullet, enemies, this.destroy, null, this)
    this.bullet.setVelocity(Math.cos(angle) * this.gun.bulletVelocity, Math.sin(angle) * this.gun.bulletVelocity);
    this.sound.play("shoot", { volume: 0.15 });
    this.time.delayedCall(1000, () => {
      this.gun.weaponCanShoot = true;
    });
    this.time.delayedCall(20000, () => {
      this.bullet.destroy();
    });

  }

  damage(object) {
    console.log(object)
    this.object.loseHP();
    console.log(object.hp)
    if (object.hp <= 0) {
      this.destroy(object)
    }
  }

  destroy(object1, object2) {
    object1.destroy()
    object2.destroy()
  }

  loadInterface() {
    this.scene.run('Interface', {
    });
  }
  gunOrientation() {
    if (this.data_holder.cameraPosX >= 0) {
      this.gun.setFrame(1);
    } else if (this.data_holder.cameraPosX < 0) {
      this.gun.setFrame(0);
    }
  }
  createLights() {
    this.lights.enable();
    this.playerLight = this.lights.addLight(this.gun.x, this.gun.y, 512);
    this.playerLight.setColor(0xffffff)
    this.playerLight.setIntensity(2)
  }

}


export default TestRoom