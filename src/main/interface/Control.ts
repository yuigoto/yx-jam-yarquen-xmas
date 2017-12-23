namespace Xmas {
  /**
   * YX : YARQUEN JAM : Interface/Control
   * ====================================================================
   * Used to handle a single player controller.
   * --------------------------------------------------------------------
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface Control {
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
  }
}
