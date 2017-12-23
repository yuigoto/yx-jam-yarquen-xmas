namespace Xmas {
  /**
   * YX : YARQUEN JAM : States/Boot
   * ====================================================================
   * Bootstraps things for the game to preload.
   * --------------------------------------------------------------------
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Boot extends Phaser.State {
    /**
     * Preloads the Loader assets.
     */
    preload() {
      // Loader in/out
      this.load.image("loader_i", "assets/image/ui/loader_i.png");
      this.load.image("loader_o", "assets/image/ui/loader_o.png");
    }

    /**
     * Runs at the very start of the scene.
     */
    create() {
      // Leave this as 1, unless you REALLY need multitouch
      this.input.maxPointers = 1;

      // Set to pause when tab loses focus
      this.stage.disableVisibilityChange = true;

      // Start arcade physics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      // Desktop/mobile specific stuff
      if (this.game.device.desktop) {
        // Desktop settings
        this.scale.pageAlignHorizontally = true;
      } else {
        // Mobile settings
      }

      // Fire peloader!
      this.game.state.start("Load", true, false);
    }
  }
}
