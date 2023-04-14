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

/*Debug:
32: Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'setText')
*/


///UI///
class Interface extends Phaser.Scene {
  constructor() {
    super("Interface");
  }

  create() {
    //UI
    //this.socket = io();
    this.scene.bringToTop();
    this.blueScoreText = this.add.text(16, 16, 'SCORE', { fontSize: '32px', fill: '#0000FF' });
    this.redScoreText = this.add.text(16, 48, 'SCORE', { fontSize: '32px', fill: '#FF0000' });
    /*this.socket.on('scoreUpdate', function (scores) {
      self.blueScoreText.setText('Blue: ' + scores.blue);
      self.redScoreText.setText('Red: ' + scores.red);
    });
*/
  };
}
export default Interface