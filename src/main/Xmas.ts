namespace Xmas {
  /**
   * YX : YARQUEN JAM : Game
   * ====================================================================
   * Base game class.
   * --------------------------------------------------------------------
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Game extends Phaser.Game {
    /**
     * Class constructor.
     */
    constructor() {
      // Define game
      super(360, 640, Phaser.AUTO, "yx-game", null, false, false);

      // Define HTML objects
      let name  = document.getElementById("yx-name"),
          desc  = document.getElementById("yx-desc"),
          copy  = document.getElementById("yx-copy");

      // Set values
      name.innerHTML  = "DO NOT DRINK DURING XMAS ";
      desc.innerHTML  = "Drive, Recover Presents, Don't Crash, Don't Drink!";
      copy.innerHTML  = "©2017 Fabio Y. Goto";

      // Add all states
      this.state.add("Boot", Boot, false);
      this.state.add("Load", Load, false);
      this.state.add("Menu", Menu, false);
      this.state.add("Play", Play, false);
      this.state.add("Scores", Scores, false);

      // Fire up the game
      this.state.start("Boot");
    }
  }
}
