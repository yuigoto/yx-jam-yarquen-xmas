namespace Xmas {
  /**
   * YX : YARQUEN JAM : Object/ControlItem
   * ====================================================================
   * Instance of a single, manageable, controller.
   * --------------------------------------------------------------------
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class ControlItem {
    /**
     * Up direction.
     */
    up: ControlState;

    /**
     * Down direction.
     */
    down: ControlState;

    /**
     * Left direction.
     */
    left: ControlState;

    /**
     * Right direction.
     */
    right: ControlState;

    /**
     * Start button.
     */
    start: ControlState;

    /**
     * Select button.
     */
    select: ControlState;

    /**
     * Action 1 button.
     */
    action1: ControlState;

    /**
     * Action 2 button.
     */
    action2: ControlState;

    /**
     * Action 3 button.
     */
    action3: ControlState;

    /**
     * Action 4 button.
     */
    action4: ControlState;

    /**
     * Initializes the control item.
     */
    constructor() {
      // Initialize default state for all items, while also setting the key
      this.up         = ControlStateItem();
      this.up.key     = Phaser.Keyboard.UP;

      this.down       = ControlStateItem();
      this.down.key   = Phaser.Keyboard.DOWN;

      this.left       = ControlStateItem();
      this.left.key   = Phaser.Keyboard.LEFT;

      this.right      = ControlStateItem();
      this.right.key  = Phaser.Keyboard.RIGHT;

      this.start      = ControlStateItem();
      this.start.key  = Phaser.Keyboard.ENTER;

      this.select     = ControlStateItem();
      this.select.key = Phaser.Keyboard.ESC;

      this.action1      = ControlStateItem();
      this.action1.key  = Phaser.Keyboard.SPACEBAR;

      this.action2      = ControlStateItem();
      this.action2.key  = Phaser.Keyboard.A;

      this.action3      = ControlStateItem();
      this.action3.key  = Phaser.Keyboard.S;

      this.action4      = ControlStateItem();
      this.action4.key  = Phaser.Keyboard.D;
    }
  }
}
