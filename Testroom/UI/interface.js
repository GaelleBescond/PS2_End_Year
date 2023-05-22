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
    this.energy = data.energy;
    this.gunName = data.gunName;

  }

  create() {
    this.font = 'Mecha'
    this.increment = 16;
    this.scene.bringToTop();
    this.healthBar = this.add.text(this.increment, this.increment, "", { fontFamily: this.font, fontSize: '32px', fill: '#0000FF' });
    this.energyCount = this.add.text(this.increment, this.increment * 3, "", { fontFamily: this.font, fontSize: '32px', fill: '#FF0000' });
    // Create a graphics object
    const energyGauge = this.add.graphics();
    // Define the gauge bar properties
    const backgroundColor = 0xCCCCCC; // Background color of the gauge bar
    const fillColor = 0x00FF00; // Fill color of the gauge bar
    const maxValue = 100; // Maximum value of the gauge bar

    // Draw the background of the gauge bar
    energyGauge.fillStyle(backgroundColor);
    energyGauge.fillRect(this.increment, this.increment * 3, this.energy, 20);

    // Calculate the fill width based on the current value
    const fillValue = 75; // Current value of the gauge bar
    const fillWidth = (fillValue / maxValue) * width;

    // Draw the fill of the gauge bar
    energyGauge.fillStyle(fillColor);
    energyGauge.fillRect(x, y, fillWidth, height);

    this.weaponDisplay = this.add.text(this.increment, this.increment * 5, "", { fontFamily: this.font, fontSize: '32px', fill: '#00FF00' });
    this.message = this.add.text(this.increment, this.increment * 7, "", { fontFamily: this.font, fontSize: '32px', fill: '#00FF00' });

    const currentScene = this.scene.get(this.sceneName);
    currentScene.updateUI.on('dataUI', (energy, weapon, hp) => {
      this.energyCount.setText('Energy : ' + energy)
      this.weaponDisplay.setText(weapon)
      this.healthBar.setText('HP: ' + hp)
    });

    currentScene.updateUI.on('newMessage', (message) => {


    })
  }
  update() { }

}
export default Interface