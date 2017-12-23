namespace Xmas {
  /**
   * YX : YARQUEN JAM : Interface/GroupGrouper
   * ====================================================================
   * Interface that helps easy handling of multiple Phaser Groups.
   * --------------------------------------------------------------------
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export interface GroupGrouper {
    [key: string]: Phaser.Group;
  }
}
