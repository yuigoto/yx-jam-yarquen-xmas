namespace Xmas {
  /**
   * YX : YARQUEN JAM : Object/Player
   * ====================================================================
   * 
   * --------------------------------------------------------------------
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Player extends Phaser.Sprite {
    /**
     *
     * @type {number}
     */
    playerSpeed: number = 0;

    /**
     *
     * @type {number}
     */
    playerSpeedMax: number = 8;

    /**
     *
     * @type {number}
     */
    playerDrunken: number = 0;

    /**
     *
     * @type {number}
     */
    playerDrunkenMax: number = 8;

    /**
     *
     * @type {number}
     */
    time: number = 0;

    /**
     * Object constructor.
     *
     * @param {Phaser.Game} game
     * @param {number} x
     * @param {number} y
     */
    constructor(game: Phaser.Game, x: number, y: number) {
      // Call super
      super(game, x, y, "i_car", 0);

      // Set anchor
      this.anchor.setTo(0.5, 0.25);

      // Add as existing
      game.add.existing(this);
    }

    /**
     * Updates on every frame.
     */
    update() {
      this.time += 0.03;

      // Check drunkenness
      if (this.playerSpeed !== 0) {
        this.x += this.playerSpeed;

        if (this.playerDrunken) {
          this.x += this.playerDrunken * Math.cos(this.time);
        }

        this.x = clamp(this.x, 45, this.game.width - 45);

        if (this.x <= 45 || this.x >= this.game.width - 45) {
          this.angle = approach(
            this.angle,
            0,
            4
          );
        } else {
          this.angle = approach(
            this.angle,
            30 * Math.sign(this.playerSpeed) + this.playerDrunken * Math.cos(this.time),
            4
          );
        }
      } else {
        this.angle = approach(
          this.angle,
          0,
          4
        );

        if (this.playerDrunken > 0) {
          this.x += this.playerDrunken * Math.cos(this.time);
          this.angle = this.playerDrunkenMax * Math.cos(this.time);
        }
      }
    }
  }
}