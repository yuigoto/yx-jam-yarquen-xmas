namespace Xmas {
  /**
   * YX : YARQUEN JAM : States/Load
   * ====================================================================
   * Game preloader.
   * --------------------------------------------------------------------
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Load extends Phaser.State {
    /**
     * Preload bar sprite.
     */
    preloadBar: Phaser.Sprite;

    /**
     * Preload bar wrapper sprite.
     */
    preloadOut: Phaser.Sprite;

    /**
     * Sets game assets to preload.
     */
    preload() {
      // Set preloader sprites
      this.loaderImage();

      // Get assets
      const Assets = AssetsList;

      // Load images
      for (let item of Assets.image) {
        this.load.image(item.name, item.file);
      }

      // Load sounds
      for (let item of Assets.audio) {
        this.load.audio(item.name, item.file, item.autoDecode);
      }
    }

    /**
     * Runs at the very start of the scene.
     */
    create() {
      // Disable crop on preloadbar (not used?)
      // this.preloadBar.cropEnabled = false;

      // Go Home
      this.state.start("Menu");
    }

    /**
     * Sets the preloader bar.
     */
    loaderImage() {
      // Wrapper
      this.preloadOut = this.add.sprite(
        this.game.world.centerX,
        this.game.world.centerY,
        "loader_o"
      );
      this.preloadOut.anchor.setTo(0.5, 0.5);

      // Loading bar
      this.preloadBar = this.add.sprite(
        this.game.world.centerX,
        this.game.world.centerY,
        "loader_i"
      );
      this.preloadBar.anchor.setTo(0, 0);
      this.preloadBar.x -= this.preloadBar.width / 2;
      this.preloadBar.y -= this.preloadBar.height / 2;

      // Set bar as preload sprite
      this.load.setPreloadSprite(this.preloadBar, 0);
    }
  }
}
