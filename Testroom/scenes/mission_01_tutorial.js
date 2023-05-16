/*Level 5
This will be the level played by the testers.
It has to call the Interface scene on top of it (Alexandre)
It has to import the functions from other scenes,
So that only the Level design aspect and local paramaters are present here
It has to import the weapons and modules chosen by the players in the lobby
*/

import LevelTemplate from "../scenes_templates/level_template";

class Mission01 extends LevelTemplate {
  constructor() {
    super("Mission01");
  }

  init(data) { };

  preload() { };
  
  create() {
    console.log("mdr")
  };
  update() { };
}
export default Mission01