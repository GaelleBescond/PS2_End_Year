/*User interface
Interface should be showing the different resources the players have:
It has to be called in every scene
It should have a cyber visual
It must display:
- Resources
- Objectives
- The weapon selected by the shooter
- The other weapons available for the shooter
- A menu button for external things to the actual gameplay
    The menu option has to include:
    - A pause/quit game vote option
    - A options/parameters to rebind keys locally?
*/

import TestRoom from "../scenes/testroom.js";
class Interface extends Phaser.Scene {
  constructor() {
    super("Interface");
  }
  init(data) {
    this.sceneName = data.sceneName;
    this.maxEnergy = data.energy;
    this.gunName = data.gunName;
    this.maxHp = data.hp;

  }

  create() {
    this.font = 'Mecha'
    this.increment = 16;
    this.scene.bringToTop();
    this.healthBar = this.add.text(this.increment * 4, this.increment, "", { fontFamily: this.font, fontSize: '32px', fill: '#0000FF' });
    this.energyCount = this.add.text(this.increment * 4, this.increment * 3, "", { fontFamily: this.font, fontSize: '32px', fill: '#FF0000' });
    this.weaponDisplay = this.add.text(this.increment * 4, this.increment * 5, "", { fontFamily: this.font, fontSize: '32px', fill: '#00FF00' });
    this.message = this.add.text(this.increment * 4, this.increment * 7, "", { fontFamily: this.font, fontSize: '32px', fill: '#00FF00' });

    const currentScene = this.scene.get(this.sceneName);
    currentScene.updateUI.on('dataUI', (energy, weapon, hp, x, y) => {
      this.weaponDisplay.setText(weapon)
      this.healthBar.setText('HP: ' + hp)
      this.energyupdate(energy);
      this.hpUpdate(hp);
    });

    currentScene.updateUI.on('newMessage', (message) => {


    })
  }
  update() { }

  energyupdate(energy) {
    const energyGauge = this.add.graphics();
    energyGauge.setDepth(0)
    energyGauge.clear()
    energyGauge.fillStyle(0xCCCCCC);
    energyGauge.fillRect(this.increment * 4, this.increment * 3, 100 * 3, 32);
    const fill = (energy / this.maxEnergy) * 100;
    energyGauge.fillStyle(0x444488);
    energyGauge.fillRect(this.increment * 4, this.increment * 3, fill * 3, 32);
    this.energyCount.setText('Energy : ' + energy).setDepth(1)
  }

  hpUpdate(hp) {
    const healthGauge = this.add.graphics();
    healthGauge.setDepth(0)
    healthGauge.clear()
    healthGauge.fillStyle(0xCCCCCC);
    healthGauge.fillRect(this.increment * 4, this.increment, 100 * 3, 32);
    const fill = (hp / 10) * 100;
    healthGauge.fillStyle(0x884400);
    healthGauge.fillRect(this.increment * 4, this.increment, fill * 3, 32);
    this.healthBar.setText('Armour : ' + hp).setDepth(1)
  }
}
export default Interface