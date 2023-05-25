import Player from "../entities/player.js";
import Rifle from "../entities/gun_rifle.js";
import Sniper from "../entities/gun_sniper.js";
import Mortar from "../entities/gun_mortar.js";
import Soldier from "../entities/enemy_soldier.js";
import Tank from "../entities/enemy_tank.js";
import Hover from "../entities/enemy_hover.js";
import Turret from "../entities/enemy_turret.js";
import Practice from "../entities/enemy_practice.js";
class LevelTemplate extends Phaser.Scene {
  constructor(name) {
    super({
      key: name,
      physics: {
        arcade: {
          debug: true
        }
      },
      render: {
        pipeline: 'Light2D'
      }
    });

  }
  init(data) {
    this.nextSceneName = ""
    this.mapName = data.mapName;
    this.data_holder = data.data_holder;
    this.musicVolume = data.musicVolume;
    this.fxVolume = data.fxVolume;
    this.chosenGun = 0;
    this.canSwap = true;
    this.targetZoom = 0.55;
    this.physics.world.gravity.y = 1000;
    this.baseGravity = this.physics.world.gravity.y
    this.offset = 36
    this.spawnX = 0;
    this.spawnY = 0;

  }


  loadMap(levelMap) {
    this.loadBackground()
    const tileset = levelMap.addTilesetImage("Tileset_testroom", "tileset_image");
    //const calc_terrain = levelMap.createLayer("Background", tileset);
    const calc_walls = levelMap.createLayer("Walls", tileset)
    const checkPoints = levelMap.getObjectLayer("Player_Spawn");
    const enemy_SpawnPoints = levelMap.getObjectLayer("Enemies_Spawn");
    calc_walls.setCollisionByProperty({ isSolid: true });
    return { checkPoints, calc_walls,/* calc_terrain,*/ tileset, enemy_SpawnPoints }
  }

  loadBackground() {
    this.skyparallax = this.add.tileSprite(0, 0, 0, 0, "backgroundSpace")
      .setScale(2.5)
      .setOrigin(0.5)
      .setScrollFactor(0.1)
    //.setTint(0x555555);
    this.skyparallax2 = this.add.tileSprite(0, 0, 0, 0, "asteroidBackground2")
      .setScale(3.5)
      .setOrigin(0.5)
      .setScrollFactor(0.2)
    this.skyparallax3 = this.add.tileSprite(0, 0, 0, 0, "asteroidBackground3")
      .setScale(3.5)
      .setOrigin(0.5)
      .setScrollFactor(0.3)
  }

  createSpawns(checkPoints) {
    const spawnblocks = this.physics.add.group({ allowGravity: false });
    checkPoints.objects.forEach(block => {
      let object = null;
      if (block.name == "Spawn") {
        object = spawnblocks.create(block.x + 64, block.y - 64, "checkpoint")
        this.spawnX = object.x
        this.spawnY = object.y
      } else if (block.name == "Checkpoint") {
        object = spawnblocks.create(block.x + 64, block.y - 64, "checkpoint")
        
    console.log(this.player)
    console.log(object)
        this.physics.add.overlap(this.player, object, this.setSpawn)
      } else if (block.name == "Win") {
        object = spawnblocks.create(block.x + 64, block.y - 64, "checkpoint")
       this.physics.add.overlap(this.player, object, this.victory, null, this)
      }
    })
    return spawnblocks
  }

  setSpawn(object) {
    this.spawnX = object.x;
    this.spawnY = object.y;
    console.log(this.spawnX, this.spawnY)
  }

  victory() {
    this.scene.start(this.nextSceneName, {
      musicVolume: this.musicVolume,
      fxVolume: this.fxVolume,
    });
  }

  playAmbientMusic(value) {
    this.sound.play("fleet", { volume: this.musicVolume });
  }

  loadPlayer(x, y, sprite) {
    this.player = new Player(this, x, y, sprite).setScale(0.55).setSize(150, 450, 50, 0).setDepth(1);
  }

  loadGun(x, y) {
    if (this.chosenGun == 0) {
      this.gun = new Rifle(this, x, y - this.offset, 'gun').setScale(0.3).setDepth(2);
    } else if (this.chosenGun == 1) {
      this.gun = new Sniper(this, x, y - this.offset, 'gun').setScale(0.6).setDepth(2);
    } else if (this.chosenGun == 2) {
      this.gun = new Mortar(this, x, y - this.offset, 'gun').setScale(0.8).setDepth(2);
    }
  }


  loadEnemies(spawner, ground, calc_jumpObjects) {
    const enemies = this.add.group();
    spawner.objects.forEach(spawn => {
      let enemy = null;
      if (spawn.name == "soldier") {
        enemy = new Soldier(this, spawn.x, spawn.y, "enemy_soldier").setScale(0.25).setDepth(0);
      } else if (spawn.name == "tank") {
        enemy = new Tank(this, spawn.x, spawn.y, "enemy_tank").setScale(1).setDepth(0);
      } else if (spawn.name == "hover") {
        enemy = new Hover(this, spawn.x, spawn.y, "enemy_hovercraft").setScale(1).setDepth(0);
      } else if (spawn.name == "turret") {
        enemy = new Turret(this, spawn.x, spawn.y, "enemy_turret").setScale(0.25).setDepth(0);
      } else if (spawn.name == "practice") {
        enemy = new Practice(this, spawn.x, spawn.y, "practice_target").setScale(0.25).setDepth(0).setImmovable(true);
      }
      enemy.update(this.player);
      this.physics.add.collider(enemy, ground)
      enemies.add(enemy)
    });
    return enemies;
  }

  enemiesBehaviour(enemies) {
    this.enemies.forEach(enemy => {
      enemy.update(this.player);
    })
  }

  loadJumpBlocks(block) {
    const blocks = this.physics.add.group({ allowGravity: false });
    block.objects.forEach(spawn => {
      let object = blocks.create(spawn.x + 64, spawn.y - 32, "jumpBlock")
      blocks.add(object)
    })
    return blocks
  }
  createLights() {
    this.lights.enable();
    this.playerLight = this.lights.addLight(this.gun.x, this.gun.y, 512);
    this.playerLight.setColor(0xffffff)
    this.playerLight.setIntensity(2)
  }

  createCamera() {
    //set camera between player and mouse (average coordinates)
    this.cameraFocal = this.physics.add.sprite(this.player.x, this.player.y, "crosshair")
      .setScale(0.15);
    this.cameraFocal.body.setAllowGravity(false);
    this.cameras.main.startFollow(this.cameraFocal);
    this.cameras.main.setZoom(this.targetZoom * 2);
  }

  updateCamera() {
    if (this.targetZoom < this.gun.camZoom) {
      this.targetZoom += 0.005;
    } else if (this.targetZoom > this.gun.camZoom) {
      this.targetZoom -= 0.005;
    }
    if (Math.abs(this.targetZoom - this.gun.camZoom) < 0.005) {
      this.targetZoom = this.gun.camZoom;
    }
    this.cameras.main.setZoom(this.targetZoom * 1.2);
  }

  loadInterface(sceneName, energy, gunName, hp) {
    this.scene.run('Interface', {
      sceneName,
      energy,
      gunName,
      hp
    });
  }

  mouseMovements() {
    this.input.on('pointermove', (pointer) => {
      this.data_holder.cameraPosX = pointer.x - 1920 / 2;
      this.data_holder.cameraPosY = pointer.y - 1080 / 2;
      this.data_holder.gunAngle = Phaser.Math.Angle.Between(this.gun.x, this.gun.y, this.cameraFocal.x, this.cameraFocal.y);
      if (this.data_holder.cameraPosX >= 0) {
        this.player.facing = false;
      } else {
        this.player.facing = true;
      }
    }, this);
  }

  mouseActions(layers, target) {
    this.input.on('pointerdown', (pointer) => {
      if (this.gun.weaponCanShoot && this.player.energy >= this.gun.consumption * this.gun.projectilesPerShoot) {
        for (let i = 0; i < this.gun.projectilesPerShoot; i++) {
          this.time.delayedCall(100 * i, () => {
            this.shootBullet(this.gun.x, this.gun.y, this.data_holder.gunAngle, layers, target);
          });
        }
      }
      if (this.gun.weaponCanShoot && this.player.energy < this.gun.consumption * this.gun.projectilesPerShoot) {
        this.sound.play("empty_gun", { volume: this.fxVolume })
      }
    });
  }

  shootBullet(originX, originY, angle, layers, target) {
    this.player.energy -= this.gun.consumption;
    this.gun.weaponCanShoot = false;
    if (this.chosenGun == 0) {
      this.bullet = this.physics.add.sprite(originX, originY, 'bullet').setCircle(10)
    } else if (this.chosenGun == 1) {
      this.bullet = this.physics.add.sprite(originX, originY, 'bullet').setCircle(10)
    } else if (this.chosenGun == 2) {
      this.bullet = this.physics.add.sprite(originX, originY, 'mortar_orb').setScale(0.25).setCircle(100)
      this.bullet.play("mortar_orb_effects")
    } else {
      this.bullet = this.physics.add.sprite(originX, originY, 'bullet')
    }
    this.bullet.setVelocity(Math.cos(angle) * this.gun.bulletVelocity, Math.sin(angle) * this.gun.bulletVelocity);
    this.physics.add.collider(this.bullet, layers.calc_walls, this.destroy, null, this)
    this.physics.add.collider(this.bullet, target, this.damage, null, this)
    this.sound.play("shoot", { volume: this.fxVolume });
    this.time.delayedCall(1000, () => {
      this.gun.weaponCanShoot = true;
    });
    this.time.delayedCall(20000, () => {
      this.bullet.destroy();
    });
  }

  shootEnemyBullet(enemy, layers) {
    if (enemy.name != "practice" && enemy.targetInRange) {
      if (enemy.canShoot) {
        enemy.canShoot = false;
        if (enemy.name == "soldier") {
          this.enemyBullet = this.physics.add.sprite(enemy.x, enemy.y, 'bullet').setCircle(10)
        } else if (enemy.name == "tank") {
          this.enemyBullet = this.physics.add.sprite(enemy.x, enemy.y, 'bullet').setCircle(10)
        } else if (enemy.name == "hover") {
          this.enemyBullet = this.physics.add.sprite(enemy.x, enemy.y, 'mortar_orb').setScale(0.25).setCircle(100)
          this.enemyBullet.play("mortar_orb_effects")
        } else {
          this.enemyBullet = this.physics.add.sprite(enemy.x, enemy.y, 'bullet')
        }
        this.enemyBullet.setVelocity(Math.cos(enemy.bulletAngle) * enemy.bulletVelocity, Math.sin(enemy.bulletAngle) * enemy.bulletVelocity);
        this.physics.add.collider(this.enemyBullet, layers.calc_walls, this.destroy, null, this)
        this.physics.add.collider(this.player, this.enemyBullet, (player, bullet) => {
          this.damagePlayer(player, bullet, enemy.bulletDamage);
        }, null, this);
        this.sound.play("shoot", { volume: this.fxVolume });//add distance player/enemy
        this.time.delayedCall(10000, () => {
          this.enemyBullet.destroy();
        });
      } else if (!enemy.canShoot && !enemy.isOnCooldown) {
        enemy.isOnCooldown = true;
        this.time.delayedCall(enemy.cooldown, () => {
          enemy.canShoot = true
          enemy.isOnCooldown = false;
        });
      }
    }
  }

  damagePlayer(target, bullet, value) {
    bullet.destroy()
    target.hp -= value
    console.log(value)
  }

  damage(bullet, target) {
    bullet.destroy()
    target.loseHP(this.gun.damage)
    //console.log(target.hp)
    if (target.hp <= 0) {
      this.events.off(Phaser.Scenes.Events.UPDATE, target.update, target);
      target.destroy()
    }
  }

  destroy(object1) {
    object1.destroy()
  }

  generalPositioning() {
    //updates gun location
    if (this.data_holder.cameraPosX > 0) {
      this.gun.x = this.player.x
    }
    else if (this.data_holder.cameraPosX < 0) {
      this.gun.x = this.player.x
    }
    this.gun.y = this.player.y - this.offset
    this.gun.animate(this.player.facing)
    this.gun.setRotation(this.data_holder.gunAngle)
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
      this.physics.world.gravity.y = this.baseGravity;
    };
  }


  swapGun(eKey, qKey) {
    if ((eKey.isDown || qKey.isDown) && this.canSwap) {
      this.canSwap = false;
      if (eKey.isDown) {
        if (this.chosenGun <= 2) {
          this.chosenGun += 1;
          if (this.chosenGun > 2) {
            this.chosenGun = 0;
          }
          this.gun.destroy();
          this.loadGun(this.player.x, this.player.y)
        }
      }
      if (qKey.isDown) {
        if (this.chosenGun >= 0) {
          this.chosenGun -= 1;
          if (this.chosenGun < 0) {
            this.chosenGun = 2;
          }
          this.gun.destroy();
          this.loadGun(this.player.x, this.player.y)
        }
      }
      this.time.delayedCall(200, () => {
        this.swapCooldown();
      });
    };
  }
  swapCooldown() {
    this.canSwap = true;
  }
}


export default LevelTemplate