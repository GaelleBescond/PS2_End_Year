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
import eventsCenter from "./EventsCenter.js"

///UI///


export class interface extends Phaser.Scene {
  constructor() {
    super("interface");
  }
  
  create() {
    this.label = this.add.text(10, 10, 'Count: 0', {
      fontSize: 32
    })

    eventsCenter.on('update-count', this.updateCount, this);
  };

  updateCount() {
    this.label.text = `Count: ${count}`
  };
}
