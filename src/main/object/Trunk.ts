namespace Xmas {
  /**
   * YX : YARQUEN JAM : Object/Trunk
   * ====================================================================
   *
   * --------------------------------------------------------------------
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Trunk extends Phaser.Sprite {
    /**
     * Trigger bump.
     *
     * @type {boolean}
     */
    triggered: boolean = false;

    /**
     * Object constructor.
     *
     * @param {Phaser.Game} game
     * @param {number} x
     * @param {number} y
     */
    constructor(game: Phaser.Game, x: number, y: number) {
      // Call super
      super(game, x, y, "i_trunk", 0);

      // Set anchor
      this.anchor.setTo(0.5, 0.5);

      // Initialize physics
      //game.physics.enable(this, Phaser.Physics.ARCADE);

      // Add as existing
      game.add.existing(this);
    }

    /**
     * Updates on every frame.
     */
    update() {
    }
  }
}