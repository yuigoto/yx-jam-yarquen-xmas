namespace Xmas {
  /**
   * YX : YARQUEN JAM : Helper/Scoreboard
   * ====================================================================
   * Simple scoreboard manager.
   * --------------------------------------------------------------------
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Scoreboard {
    /**
     * Stores the current scoreboard.
     */
    scores: Array<ScoreItem>;

    /**
     * Class constructor.
     */
    constructor() {
      let load = localStorage.getItem("dddx.scores");
      if (!load) {
        this.scores = this.initScores();
      } else {
        this.scores = JSON.parse(load);
      }
    }

    /**
     * Initializes the scores.
     *
     * @returns {Array}
     */
    initScores() {
      // Init array
      let list = [];

      // Create scores
      for (let i = 0; i < 10; i++) {
        // Generate item
        let item: ScoreItem = {
          name: "Anonymous",
          time: 0,
          score: 0,
          position: i + 1
        };

        // Push item
        list.push(item);
      }

      // Save to localstorage
      localStorage.setItem("dddx.scores", JSON.stringify(list));

      // Return the generated list
      return list;
    }
  }
}
