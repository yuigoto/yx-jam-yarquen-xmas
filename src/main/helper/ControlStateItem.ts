namespace Xmas {
  /**
   * YX : YARQUEN JAM : Helper/ControlStateItem
   * ====================================================================
   * Returns an object representing a single ControlState.
   * --------------------------------------------------------------------
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export function ControlStateItem() {
    return {
      hold: 0,
      pressed: false,
      release: false,
      previous: 0,
      key: Phaser.Keyboard.SPACEBAR
    };
  }
}
