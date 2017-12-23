namespace Xmas {
  /**
   * YX : YARQUEN JAM : Object/Controller
   * ====================================================================
   * Phaser.Sprite object used to handle inputs.
   * --------------------------------------------------------------------
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Controller extends Phaser.Sprite {
    /**
     * Manageable controller item.
     */
    controls: ControlItem;

    /**
     * Phaser.Keyboard instance.
     */
    private keys:Phaser.Keyboard;

    /**
     * Class constructor.
     *
     * @param {Phaser.Game} game
     */
    constructor(game: Phaser.Game) {
      // Call super
      super(game, -1280, -1280, "controls");

      // Instance of keys
      this.keys = this.game.input.keyboard;

      // Initialize controller
      this.controls = new ControlItem();

      // Add to existence
      game.add.existing(this);
    }

    /**
     * Updates on every frame
     */
    update() {
      // Get keys on controls
      let keys = Object.keys(this.controls);

      // Check all keys
      for (let key of keys) {
        let curr = this.controls[key];

        // Instance of key
        curr.hold = (this.keys.isDown(curr.key)) ? 1 : 0;
        curr.pressed = (curr.previous === 0 && curr.hold === 1);
        curr.release = (curr.previous === 1 && curr.hold === 0);

        // Set current as previous state too
        curr.previous = curr.hold;
      }
    }
  }
}
