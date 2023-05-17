import Player from "../entities/player.js";
import Rifle from "../entities/gun_rifle.js";
import Sniper from "../entities/gun_sniper.js";
import Mortar from "../entities/gun_mortar.js";
import Soldier from "../entities/enemy_soldier.js";
import Tank from "../entities/enemy_tank.js";
import Hover from "../entities/enemy_hover.js";
import Turret from "../entities/enemy_turret.js";
class LevelTemplate extends Phaser.Scene {
  constructor(name) {
    super({
      key: name,
      physics: {
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
    this.mapTilesetImage = data.mapTilesetImage;
    this.data_holder = data.data_holder;
    this.musicVolume = data.musicVolume;
    this.fxVolume = data.fxVolume;
    this.chosenGun = 0;
    this.canSwap = true;
  }

  create() {
    const levelMap = this.add.tilemap(this.mapName);
    const layers = this.loadMap(levelMap);
  };

  loadMap(levelMap) {
    this.loadBackground()
    const tileset = levelMap.addTilesetImage("Tileset_testroom", "tileset_image");
    const calc_terrain = levelMap.createLayer("Background", tileset);
    const calc_walls = levelMap.createLayer("Walls", tileset)
    const spawnPoints = levelMap.getObjectLayer("Player_Spawn");
    const enemy_SpawnPoints = levelMap.getObjectLayer("Enemies_Spawn");
    calc_walls.setCollisionByProperty({ isSolid: true });
    return { spawnPoints, calc_walls, calc_terrain, tileset, enemy_SpawnPoints }
  }

  loadBackground() {
    this.skyparallax = this.add.tileSprite(0, 0, 0, 0, "background")
      .setScale(2.5)
      .setOrigin(0.5)
      .setScrollFactor(0.2)
    //.setTint(0x555555);
  }

  playAmbientMusic(value) {
    this.sound.play("fleet", { volume: this.musicVolume });
  }

  loadPlayer(x, y, sprite) {
    this.player = new Player(this, x, y, sprite).setScale(0.55).setSize(150, 450, 50, 0);
  }

  loadGun(x, y) {
    if (this.chosenGun == 0) {
      this.gun = new Rifle(this, x, y - 48,'gun').setScale(0.07);
    } else if (this.chosenGun == 1) {
      this.gun = new Sniper(this, x, y - 48,'gun').setScale(0.07);
    } else if (this.chosenGun == 2) {
      this.gun = new Mortar(this, x, y - 48,'gun').setScale(0.07);
    }
  }
  gunOrientation() {
    if (this.data_holder.cameraPosX >= 0) {
      this.gun.setFrame(1);
    } else if (this.data_holder.cameraPosX < 0) {
      this.gun.setFrame(0);
    }
    this.gun.setRotation(this.data_holder.gunAngle)
  }

  loadEnemies(spawner, ground) {
    const enemies = this.add.group();
    spawner.objects.forEach(spawn => {
      let enemy = null;

      console.log(spawn.name);
      if (spawn.name == "soldier") {
        enemy = new Soldier(this, spawn.x, spawn.y, "enemy_1").setScale(0.25);
      } else if (spawn.name == "tank") {
        enemy = new Tank(this, spawn.x, spawn.y, "enemy_2").setScale(0.25);
      } else if (spawn.name == "hover") {
        enemy = new Hover(this, spawn.x, spawn.y, "enemy_3").setScale(0.25);
      } else if (spawn.name == "turret") {
        enemy = new Turret(this, spawn.x, spawn.y, "enemy_4").setScale(0.25);
      }
      this.physics.add.collider(enemy, ground)
      enemies.add(enemy)
    });
    return enemies;
  }

  createLights() {
    this.lights.enable();
    this.playerLight = this.lights.addLight(this.gun.x, this.gun.y, 512);
    this.playerLight.setColor(0xffffff)
    this.playerLight.setIntensity(2)
  }

  createCamera() {
    //set camera between player and mouse (average coordinates)
    this.cameraFocal = this.physics.add.sprite(this.player.x, this.player.y);
    this.cameraFocal.body.setAllowGravity(false);
    this.cameras.main.startFollow(this.cameraFocal);
  }

  updateCamera() {
    this.cameras.main.setZoom(this.gun.camZoom);
  }

  loadInterface() {
    this.scene.run('Interface', {
    });
  }

  mouseMovements() {
    this.input.on('pointermove', function (pointer) {
      this.data_holder.cameraPosX = pointer.x - 1280 / 2;
      this.data_holder.cameraPosY = pointer.y - 768 / 2;
      this.data_holder.gunAngle = Phaser.Math.Angle.Between(this.gun.x, this.gun.y, this.cameraFocal.x, this.cameraFocal.y);
      this.events.emit('updateUI', this.data_holder);
    }, this);
  }

  mouseActions(layers, target) {
    this.input.on('pointerdown', (pointer) => {
      if (this.gun.weaponCanShoot && this.data_holder.ammo > 0) {
        for (let i = 0; i < this.gun.projectilesPerShoot; i++) {
          this.time.delayedCall(100 * i, () => {
            this.shootBullet(this.gun.x, this.gun.y, this.data_holder.gunAngle, layers, target);
          });
        }
      }
      if (this.gun.weaponCanShoot && this.data_holder.ammo <= 0) {
        this.sound.play("empty_gun", { volume: this.fxVolume })
      }
    });
  }

  shootBullet(x, y, angle, layers, target) {
    this.data_holder.ammo -= 3;
    this.gun.weaponCanShoot = false;
    this.bullet = this.physics.add.sprite(x, y, 'bullet')
    this.physics.add.collider(this.bullet, layers.calc_walls, this.destroy, null, this)
    this.physics.add.collider(this.bullet, target, this.damage, null, this)
    this.bullet.setVelocity(Math.cos(angle) * this.gun.bulletVelocity, Math.sin(angle) * this.gun.bulletVelocity);
    this.sound.play("shoot", { volume: this.fxVolume });
    this.time.delayedCall(1000, () => {
      this.gun.weaponCanShoot = true;
    });
    this.time.delayedCall(20000, () => {
      this.bullet.destroy();
    });
  }
  damage(bullet, target) {
    bullet.destroy()
    target.loseHP(this.gun.damage)
    console.log(target.hp)
    if (target.hp <= 0) {
      this.events.off(Phaser.Scenes.Events.UPDATE, target.update, target);
      target.destroy()
    }
  }
  destroy(object1) {
    object1.destroy()
  }

  generalPositioning() {
    //mouse aiming and updated location for the gun
    if (this.data_holder.cameraPosX > 0) {
      this.gun.x = this.player.x + 5
    }
    else if (this.data_holder.cameraPosX < 0) {
      this.gun.x = this.player.x - 5
    }
    this.gun.y = this.player.y - 5
    this.cameraFocal.setPosition(this.player.x + (this.data_holder.cameraPosX) * 0.7, this.player.y + (this.data_holder.cameraPosY) * 0.7)
   // this.playerLight.setPosition(this.gun.x, this.gun.y);
  }

  gravityTool() {
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
  }
}


export default LevelTemplate