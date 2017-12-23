namespace Xmas {
  /**
   * YX : YARQUEN JAM : States/Menu
   * ====================================================================
   * Title Screen/Menu.
   * --------------------------------------------------------------------
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Menu extends Phaser.State {
    /**
     * Handles controller.
     */
    controls: Controller;

    /**
     * Groups home text objects for easy management.
     */
    homeText: ItemGroup;

    /**
     * Holds tiles for the background.
     */
    tileGroups: Phaser.Group;

    /**
     * Just a timer.
     *
     * @type {number}
     */
    grow: number = 0;

    /**
     * Runs at the very start of the scene.
     */
    create() {
      // Add controls
      this.controls = new Controller(this.game);

      // Create group
      this.tileGroups = this.game.add.group();

      // Add home background
      for (let i = -1; i < Math.ceil(this.game.height / 160); i++) {
        this.game.add.sprite(
          0,
          i * 160,
          "i_grounddark",
          null,
          this.tileGroups
        );
      }

      // Create group
      this.homeText = {};

      // Add game title
      this.homeText.title = this.game.add.text(
        this.game.world.centerX,
        this.game.world.centerY - 160,
        "DO NOT\nDRINK\nDURING\nXMAS",
        {
          align: "center",
          fill: "#edd400",
          font: "Barlow",
          fontSize: 48,
          fontWeight: 400,
          stroke: "#f00",
          strokeThickness: 4
        }
      );
      this.homeText.title.anchor.set(0.5, 0.5);

      // Add game instructions
      this.homeText.info = this.game.add.text(
        this.game.world.centerX,
        this.game.height - 196,
        "'Space' to start\n'Left/Right' to play\n'S' for scores",
        {
          align: "center",
          fill: "#ffffff",
          font: "Barlow",
          fontSize: 16,
          fontWeight: 700
        }
      );
      this.homeText.info.anchor.set(0.5, 0.5);

      // Add game credits
      this.homeText.credit = this.game.add.text(
        this.game.world.centerX,
        this.game.height - 32,
        "©2017 YUITI",
        {
          align: "center",
          fill: "#ffffff",
          font: "Barlow",
          fontSize: 14,
          fontWeight: 700
        }
      );
      this.homeText.credit.anchor.set(0.5, 0.5);
    }

    /**
     * Updates every frame.
     */
    update(game) {
      // Update timer
      this.grow += 0.1;

      // Rotate title
      this.homeText.title.angle = 5 * Math.cos(this.grow);
      this.homeText.title.scale.set(
        1 + .25 * Math.sin(this.grow)
      );

      // Move
      this.tileGroups.forEach((item) => {
        item.y += 16;
        if (item.y >= this.game.height) {
          item.y = -160;
        }
      }, this);

      if (this.controls.controls.action1.pressed) {
        console.log("SPACED!");
        this.state.start("Play");
      } else if (this.controls.controls.select.pressed) {
        console.log("ESCAPED!");
      } else if (this.controls.controls.action3.pressed) {
        console.log("SCORED!");
        this.state.start("Scores");
      }
    }
  }
}
