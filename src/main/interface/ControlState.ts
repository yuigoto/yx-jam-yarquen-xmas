namespace Xmas {
  /**
   * YX : YARQUEN JAM : Interface/ControlState
   * ====================================================================
   * Used to handle state for a single control.
   * --------------------------------------------------------------------
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface ControlState {
    hold: number,
    pressed: boolean,
    release: boolean,
    previous: number,
    key: number
  }
}
