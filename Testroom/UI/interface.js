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
-


*/

import TestRoom from "../scenes/testroom.js";

/*Debug:
32: Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'setText')
*/


///UI///
class Interface extends Phaser.Scene {
  constructor() {
    super("Interface");
  }
  init() {

  }

  create() {
    this.font = 'Mecha'
    this.increment = 16;
    this.scene.bringToTop();
    this.progressBar = this.add.text(this.increment, this.increment, 'Progress :', { fontFamily: this.font, fontSize: '32px', fill: '#0000FF' });
    this.ammoCount = this.add.text(this.increment, this.increment * 3, 'Ammo :', { fontFamily: this.font, fontSize: '32px', fill: '#FF0000' });
    this.weaponDisplay = this.add.text(this.increment, this.increment * 5, 'Rifle', { fontFamily: this.font, fontSize: '32px', fill: '#00FF00' });
    this.events.on('updateUI', function (data) {
      console.log("update")
      this.progressBar.setText('Progress : ' + data.progress)
      this.ammoCount.setText('Ammo : ' + data.ammo)
    }, this);
  };

  update() {

  }
}
export default Interface