namespace Xmas {
  /**
   * YX : YARQUEN JAM : States/Scores
   * ====================================================================
   * Shows high scores from local storage.
   * --------------------------------------------------------------------
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Scores extends Phaser.State {
    /**
     * Handles controller.
     */
    controls: Controller;

    /**
     * Groups home text objects for easy management.
     */
    scoresText: ItemGroup;

    /**
     * Holds a reference to the scoreboard.
     */
    scoresList: Scoreboard;

    /**
     * Phaser group to hold scores.
     */
    scoresGroup: Phaser.Group;

    /**
     * Just a timer.
     *
     * @type {number}
     */
    grow: number = 0;

    /**
     * Just a timer.
     *
     * @type {number}
     */
    turn: number = 0;

    /**
     * Runs at the very start of the scene.
     */
    create() {
      // Init scores
      this.scoresList = new Scoreboard();

      // Add controls
      this.controls = new Controller(this.game);

      // Create group
      this.scoresText = {};

      // Add game title
      this.scoresText.title = this.game.add.text(
        this.game.world.centerX,
        64,
        "BEST SCORES",
        {
          align: "center",
          fill: "#edd400",
          font: "Barlow",
          fontSize: 32,
          fontWeight: 400,
          stroke: "#f00",
          strokeThickness: 4
        }
      );
      this.scoresText.title.anchor.set(0.5, 0.5);

      // Add info title
      this.scoresText.info = this.game.add.text(
        this.game.world.centerX,
        this.game.height - 32,
        "Press 'Esc' to go back to title",
        {
          align: "center",
          fill: "#fff",
          font: "Barlow",
          fontSize: 16,
          fontWeight: 700
        }
      );
      this.scoresText.info.anchor.set(0.5, 0.5);

      // Add group
      this.scoresGroup = this.game.add.group();

      // Place scores
      for (let i = 0; i < this.scoresList.scores.length; i++) {
        let curr = this.scoresList.scores[i];
        let item = this.game.add.text(
          this.game.world.centerX,
          128 + (i * 40),
          curr.name + " : " + curr.score,
          {
            align: "center",
            fill: "#fff",
            font: "Barlow",
            fontSize: 20,
            stroke: "#f0f",
            strokeThickness: 4
          },
          this.scoresGroup
        );
        item.anchor.set(0.5, 0.5);
      }
    }

    /**
     * Updates every frame.
     */
    update(game) {
      // Update timer
      this.grow += 0.1;

      // Rotate title
      this.scoresText.title.angle = 5 * Math.cos(this.grow);
      this.scoresText.title.scale.set(
        1 + .25 * Math.sin(this.grow)
      );

      if (this.controls.controls.select.pressed) {
        this.state.start("Menu");
      }

      this.scoresGroup.forEach((item) => {
        item.angle = 5 * Math.cos(this.grow);
        item.scale.set(
          1 + .25 * Math.sin(this.grow)
        );
      }, this);
    }
  }
}
