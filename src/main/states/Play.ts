namespace Xmas {
  /**
   * YX : YARQUEN JAM : States/Play
   * ====================================================================
   * Main game play state.
   * --------------------------------------------------------------------
   * @author    Fabio Y. Goto <lab@yuiti.com.br>
   * @since     0.0.1
   */
  export class Play extends Phaser.State {
    /**
     * Controller handler.
     */
    controls: Controller;

    /**
     * Moving speed.
     *
     * @type {number}
     */
    velocity: number = 16;

    /**
     * Pkayer handler.
     */
    player: Player;

    /**
     * Player position count.
     */
    playerPosition: number = 0;

    /**
     * Game status.
     *
     * @type {number}
     */
    status: number = 0;

    /**
     * Score.
     *
     * @type {number}
     */
    score: number = 0;

    /**
     * Times crashed.
     *
     * @type {number}
     */
    crashed: number = 0;

    /**
     * You know what this means.
     *
     * @type {number}
     */
    health: number = 0;

    /**
     * You know what this means.
     *
     * @type {number}
     */
    presents: number = 0;

    /**
     *
     */
    level: ItemGroup;

    // Groups
    // ----------------------------------------------------------------------

    /**
     * Handler for background tiles and other items.
     */
    groups: GroupGrouper;

    /**
     * Handles references to UI elements.
     */
    uiHandle: ItemGroup;

    // Counter
    // ----------------------------------------------------------------------

    /**
     * A counter.
     *
     * @type {number}
     */
    count: number = 0;

    // Sounds
    // ----------------------------------------------------------------------

    /**
     * Handles sounds.
     */
    soundGroup: ItemGroup;

    // Lifecycle Methods
    // ----------------------------------------------------------------------

    /**
     * Runs at the very start of the scene.
     */
    create() {
      // Initialize controllers
      this.controls = new Controller(this.game);

      // Init score
      this.score    = 0;
      this.health   = 100;
      this.crashed  = 0;
      this.status   = 0;
      this.presents = 0;

      // Define groups
      this.groups = {};
      this.uiHandle = {};
      this.soundGroup = {};
      this.level = {
        trees: [],
        items: [],
        drink: []
      };

      // Create groups below player (must follow this order)
      this.groups.tile  = this.game.add.group();
      this.groups.skid  = this.game.add.group();
      this.groups.bot   = this.game.add.group();
      this.groups.item  = this.game.add.group();
      this.groups.drink = this.game.add.group();

      // Create player
      this.player = new Player(
        this.game,
        this.game.world.centerX,
        this.game.height + 128
      );
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

      // Create groups above player (must follow this order)
      this.groups.trunk     = this.game.add.group();
      this.groups.obstacle  = this.game.add.group();
      this.groups.topside   = this.game.add.group();
      this.groups.topmain   = this.game.add.group();
      this.groups.top       = this.game.add.group();

      // Place ground tiles
      this.placeTilesGround();

      // Place trunks on sides
      this.placeTrunks();

      // Draw UI
      this.placeUI();

      // Load sounds
      this.loadSounds();

      this.soundGroup.song.loop = true;
      this.soundGroup.song.volume = 0.5;
      this.soundGroup.song.play();
    }

    /**
     * Updates every frame.
     */
    update() {
      // Move the ground
      this.groups.tile.forEach((item) => {
        if (item.y >= this.game.height) {
          item.y = -160 + this.velocity;
        } else {
          item.y += this.velocity;
        }
      }, this);

      // Move the top
      this.groups.topside.forEach((item) => {
        if (item.y >= this.game.height + 20) {
          // Move to top
          item.y = -60 + this.velocity;
        } else {
          item.y += this.velocity;
        }
      }, this);

      this.groups.topmain.forEach((item) => {
        if (item.y >= this.game.height + 20) {
          item.destroy();
        } else {
          item.y += this.velocity;
        }
      }, this);

      // Move side trunks and check collision on each of them
      this.groups.trunk.forEach((item) => {
        // Check collision
        if (checkOverlap(item, this.player)) {
          if (item.triggered === false && item.y > this.player.y) {
            item.triggered = true;
            this.soundGroup.crash.play();

            this.crashed += 1;
            this.health -= 5;
            this.health = clamp(this.health, 0, 100);
            if (this.health <= 0) this.status = 2;

            // YAY!
            if (this.crashed % 10 === 0) {
              this.soundGroup.yay.play();
            }

            if (this.soundGroup.engine.volume < 0.75) {
              console.log(this.soundGroup.engine.volume);
              this.soundGroup.engine.volume += 0.5;
            }

            if (item.x > this.player.x) {
              this.player.playerSpeed = -12;
              this.player.angle = 0;
            } else if (item.x < this.player.x) {
              this.player.playerSpeed = 12;
              this.player.angle = 0;
            }
          }
        }

        if (item.y >= this.game.height + 20) {
          // Move to top
          item.y = -60 + this.velocity;

          // Reset crash trigger
          item.triggered = false;
        } else {
          item.y += this.velocity;
        }
      }, this);

      // Move the obstacles
      this.groups.obstacle.forEach((item) => {
        // Check collision
        if (checkOverlap(item, this.player)) {
          if (item.triggered === false && item.y > this.player.y) {
            item.triggered = true;
            this.soundGroup.crash.play();

            this.crashed += 1;
            this.health -= 5;
            this.health = clamp(this.health, 0, 100);
            if (this.health <= 0) this.status = 2;

            // YAY!
            if (this.crashed % 10 === 0) {
              this.soundGroup.yay.play();
            }

            if (this.soundGroup.engine.volume < 0.75) {
              this.soundGroup.engine.volume += 0.5;
            }
          }
        }

        if (item.y >= this.game.height + 30) {
          item.destroy
        } else {
          item.y += this.velocity;
        }
      }, this);

      // Move the items
      this.groups.item.forEach((item) => {
        // Check collision
        this.game.physics.arcade.collide(item, this.player, (obj, ply) => {
          this.presents += 1;
          obj.destroy();
          this.soundGroup.present.play();
        });

        if (item.y >= this.game.height + 30) {
          item.destroy
        } else {
          item.y += this.velocity;
        }
      }, this);

      // Move the drinks
      this.groups.drink.forEach((item) => {
        // Check collision
        this.game.physics.arcade.collide(item, this.player, (obj, ply) => {
          ply.playerDrunken = approach(
            ply.playerDrunken,
            ply.playerDrunkenMax,
            1.25
          );
          this.soundGroup.drink.play();
          obj.destroy();
        });

        if (item.y >= this.game.height + 30) {
          item.destroy
        } else {
          item.y += this.velocity;
        }
      }, this);

      // Adds skid marks
      if (this.player.y < this.game.height) {
        let skid = this.game.add.sprite(
          this.player.x,
          this.player.y,
          "i_skid",
          0,
          this.groups.skid
        );
        skid.angle = this.player.angle;
        skid.anchor.set(0.5, 0.5);
      }

      // Move skid marks
      this.groups.skid.forEach((item) => {
        if (item.y >= this.game.height) {
          item.destroy();
        } else {
          item.y += this.velocity;
        }
      }, this);

      // Runs the game
      if (this.status === 0) {
        // Startup
        this.player.y -= this.playerPosition;
        if (this.player.y <= this.game.height - 192) {
          this.player.y = this.game.height - 192;
          this.status = 1;
        }

        // Play engine sound
        if (!this.soundGroup.engine.isPlaying) {
          this.soundGroup.engine.play();
          this.soundGroup.engine.loop = true;
          this.soundGroup.engine.volume = 0;
        } else {
          this.soundGroup.engine.volume = approach(
            this.soundGroup.engine.volume,
            0.5,
            0.005
          );
        }

        // Make player slide-in
        this.playerPosition = approach(this.playerPosition, 256, 0.05);
      } else if (this.status === 1) {
        if (!this.soundGroup.engine.isPlaying) {
          this.soundGroup.engine.play();
          this.soundGroup.engine.loop = true;
          this.soundGroup.engine.volume = 0.5;
        }

        // Updates score (time)
        this.score += 1;

        // Update UI scores
        this.uiHandle.score.setText("SCORE: " + this.score);
        this.uiHandle.time.setText("PRESENTS: " + this.presents);
        this.uiHandle.crash.setText("CRASHED: " + this.crashed);
        this.uiHandle.health.setText("HEALTH: " + Math.floor(this.health));
        this.uiHandle.drunken.setText(
          "DRUNKEN: " + Math.ceil(this.player.playerDrunken / this.player.playerDrunkenMax * 100) + "%"
        );

        this.handlePlayerMove();

        this.populateItems();
        this.populateStage();

        if (this.health < 100) {
          this.health = approach(this.health, 100, 0.05);
        }
      } else if (this.status === 2) {
        this.soundGroup.engine.volume = .25;

        this.uiHandle.overlay.alpha = approach(
          this.uiHandle.overlay.alpha,
          1,
          .05
        );

        this.uiHandle.reset.alpha = approach(
          this.uiHandle.reset.alpha,
          1,
          .05
        );

        this.player.playerDrunken = approach(
          this.player.playerDrunken,
          0,
          .5
        );

        this.player.x = approach(
          this.player.x,
          this.game.width / 2,
          0.5
        );

        this.player.playerSpeed = approach(
          this.player.playerSpeed,
          0,
          0.5
        );

        if (this.soundGroup.skid.isPlaying) {
          this.soundGroup.skid.volume = approach(
            this.soundGroup.skid.volume,
            0,
            0.05
          );

          if (this.soundGroup.skid.volume <= 0) {
            this.soundGroup.skid.stop();
          }
        }

        if (this.soundGroup.song.isPlaying) {
          this.soundGroup.song.volume = approach(
            this.soundGroup.song.volume,
            0.15,
            0.05
          );

          if (this.soundGroup.song.volume <= 0) {
            this.soundGroup.song.stop();
          }
        }

        if (this.controls.controls.select.pressed) {
          this.soundGroup.engine.stop();
          this.soundGroup.song.stop();
          this.state.start("Menu", false, true);
        }

        if (this.controls.controls.action1.pressed) {
          this.soundGroup.engine.stop();
          this.soundGroup.song.stop();
          this.state.restart();
        }
      }
    }

    // Game
    // ------------------------------------------------------------------

    /**
     * Handles player controls.
     */
    handlePlayerMove() {
      // Extract controller
      let { controls } = this.controls;

      // Check direction
      let move_x = controls.right.hold - controls.left.hold;
      let drink_p = controls.action3.pressed;
      let drink_m = controls.action4.pressed;

      if (drink_p) {
        this.player.playerDrunken = approach(
          this.player.playerDrunken,
          this.player.playerDrunkenMax,
          0.5
        );
      } else if (drink_m) {
        this.player.playerDrunken = approach(
          this.player.playerDrunken,
          0,
          0.5
        );
      } else {
        this.player.playerDrunken = approach(
          this.player.playerDrunken,
          0,
          0.01
        );
      }

      // Control engine volume
      if (this.soundGroup.engine.volume > 0.5) {
        this.soundGroup.engine.volume = approach(
          this.soundGroup.engine.volume,
          0.5,
          0.025
        );
      }

      // Play skid sound
      if (this.player.angle !== 0) {
        let curr  = Math.abs(this.player.angle),
          ratio = curr / 60;

        if (!this.soundGroup.skid.isPlaying) {
          this.soundGroup.skid.loop = true;
          this.soundGroup.skid.volume = ratio * 0.25;
          this.soundGroup.skid.play();
        } else {
          this.soundGroup.skid.volume = ratio * 0.25;
        }
      } else {
        if (this.soundGroup.skid.isPlaying) {
          this.soundGroup.skid.stop();
        }
      }

      // Movement (L/R)
      if (move_x !== 0) {
        if (Math.sign(this.player.playerSpeed) !== move_x) {
          this.player.playerSpeed = approach(
            this.player.playerSpeed,
            0,
            1
          );
        }

        this.player.playerSpeed = approach(
          this.player.playerSpeed,
          this.player.playerSpeedMax * move_x,
          0.5
        );
      } else {
        this.player.playerSpeed = approach(
          this.player.playerSpeed,
          0,
          1
        );
      }
    }

    // Tile placement methods
    // ------------------------------------------------------------------

    /**
     * Populates the item array.
     */
    populateItems() {
      if (this.level.trees.length < 60) {
        while (this.level.trees.length < 60) {
          let rand = random(1, 20);
          let empt = random(1, 8);
          let tunn = random(1, 9);
          let lent = random(4, 16);

          // Add Trees
          switch (rand) {
            case 1:
              this.level.trees.push([1, 0, 0, 0]);
              break;
            case 2:
              this.level.trees.push([1, 2, 2, 2]);
              break;
            case 3:
              this.level.trees.push([0, 0, 0, 1]);
              break;
            case 4:
              this.level.trees.push([2, 2, 2, 1]);
              break;
            case 5:
              this.level.trees.push([0, 1, 0, 0]);
              break;
            case 6:
              this.level.trees.push([2, 1, 2, 2]);
              break;
            case 7:
              this.level.trees.push([0, 0, 1, 0]);
              break;
            case 8:
              this.level.trees.push([2, 2, 1, 2]);
              break;
            case 20:
              for (let n = 0; n < 4; n++) {
                switch (tunn) {
                  case 1:
                    this.level.trees.push([0, 0, 1, 1]);
                    break;
                  case 2:
                    this.level.trees.push([0, 0, 1, 1]);
                    break;
                  case 3:
                    this.level.trees.push([0, 0, 1, 1]);
                    break;
                  case 4:
                    this.level.trees.push([1, 0, 0, 1]);
                    break;
                  case 5:
                    this.level.trees.push([1, 0, 0, 1]);
                    break;
                  case 6:
                    this.level.trees.push([1, 0, 0, 1]);
                    break;
                  case 7:
                    this.level.trees.push([1, 1, 0, 0]);
                    break;
                  case 8:
                    this.level.trees.push([1, 1, 0, 0]);
                    break;
                  default:
                    this.level.trees.push([1, 1, 0, 0]);
                    break;
                }
              }
              break;
            default:
              if (empt < 4) {
                this.level.trees.push([0, 0, 0, 0]);
              } else {
                for (let n = 0; n < 4; n++) {
                  this.level.trees.push([0, 0, 0, 0]);
                }
              }
              break;
          }

          // Add Items
          switch (rand) {
            case 1:
              this.level.items.push([1, 5, 4, 4]);
              break;
            case 2:
              this.level.items.push([1, 2, 2, 2]);
              break;
            case 3:
              this.level.items.push([4, 4, 5, 1]);
              break;
            case 4:
              this.level.items.push([2, 2, 2, 1]);
              break;
            case 5:
              this.level.items.push([4, 1, 4, 5]);
              break;
            case 6:
              this.level.items.push([2, 1, 2, 2]);
              break;
            case 7:
              this.level.items.push([5, 4, 1, 4]);
              break;
            case 8:
              this.level.items.push([2, 2, 1, 2]);
              break;
            case 20:
              for (let n = 0; n < 4; n++) {
                switch (tunn) {
                  case 1:
                    this.level.items.push([0, 5, 1, 1]);
                    break;
                  case 2:
                    this.level.items.push([4, 0, 1, 1]);
                    break;
                  case 3:
                    this.level.items.push([5, 4, 1, 1]);
                    break;
                  case 4:
                    this.level.items.push([1, 5, 4, 1]);
                    break;
                  case 5:
                    this.level.items.push([1, 4, 0, 1]);
                    break;
                  case 6:
                    this.level.items.push([1, 0, 5, 1]);
                    break;
                  case 7:
                    this.level.items.push([1, 1, 4, 5]);
                    break;
                  case 8:
                    this.level.items.push([1, 1, 5, 4]);
                    break;
                  default:
                    this.level.items.push([1, 1, 0, 0]);
                    break;
                }
              }
              break;
            default:
              if (empt < 4) {
                this.level.items.push([4, 4, 4, 4]);
              } else {
                for (let n = 0; n < 4; n++) {
                  this.level.items.push([5, 0, 5, 0]);
                }
              }
              break;
          }
        }
      }
    }

    /**
     * Keeps adding items/trees.
     */
    populateStage() {
      if (this.count === 16) {
        let tree = this.level.trees.shift();
        let item = this.level.items.shift();

        for (let t = 0; t < tree.length; t++) {
          if (tree[t] === 1) {
            let obst = new Trunk(
              this.game,
              90 + (60 * t),
              -60
            );
            obst.checkWorldBounds = true;
            this.groups.obstacle.add(obst);

            let top = this.game.add.sprite(
              90 + (60 * t),
              -60,
              "i_tree",
              0,
              this.groups.topmain
            );
            top.anchor.set(0.5, 0.5);
            top.checkWorldBounds = true;
          } else if (random(0, 8) === 5 && tree[t] === 2) {
            let obst = new Trunk(
              this.game,
              90 + (60 * t),
              -60
            );
            obst.checkWorldBounds = true;
            this.groups.obstacle.add(obst);

            let top = this.game.add.sprite(
              90 + (60 * t),
              -60,
              "i_tree",
              0,
              this.groups.topmain
            );
            top.anchor.set(0.5, 0.5);
            top.checkWorldBounds = true;
          }
        }

        for (let t = 0; t < item.length; t++) {
          if (item[t] === 4 && random(1, 16) % 3 === 0) {
            let ittt = this.game.add.sprite(
              90 + (60 * t),
              -60,
              "i_item",
              0,
              this.groups.item
            );
            this.game.physics.enable(ittt, Phaser.Physics.ARCADE);
            ittt.anchor.set(0.5, 0.5);
          } else if (item[t] === 5 && random(1, 16) % 4 === 0) {
            let ittt = this.game.add.sprite(
              90 + (60 * t),
              -60,
              "i_drink",
              0,
              this.groups.drink
            );
            this.game.physics.enable(ittt, Phaser.Physics.ARCADE);
            ittt.anchor.set(0.5, 0.5);
          }
        }

        this.count = 0;
      } else {
        this.count += 1;
      }
    }

    /**
     * Loads all sounds used during gameplay.
     */
    loadSounds() {
      this.soundGroup.crash = this.game.add.sound(
        "au_crash",
        .5,
        false
      );

      this.soundGroup.engine = this.game.add.sound(
        "au_engine",
        .5,
        false
      );

      this.soundGroup.skid = this.game.add.sound(
        "au_skid",
        .25,
        false
      );

      this.soundGroup.yay = this.game.add.sound(
        "au_yay",
        .25,
        false
      );

      this.soundGroup.song = this.game.add.sound(
        "au_music",
        .5,
        false
      );

      this.soundGroup.present = this.game.add.sound(
        "au_present",
        .5,
        false
      );

      this.soundGroup.drink = this.game.add.sound(
        "au_drink",
        .5,
        false
      );
    }

    /**
     * Places trunks on sideways.
     */
    placeTrunks() {
      for ( let i = -1; i < Math.ceil(this.game.height / 60); i++) {
        let tile1 = new Trunk(
          this.game,
          30,
          Math.ceil(i * 60) + 30
        );
        tile1.checkWorldBounds = true;
        this.groups.trunk.add(tile1);

        let tile2 = new Trunk(
          this.game,
          this.game.width - 30,
          Math.ceil(i * 60) + 30
        );
        tile2.checkWorldBounds = true;
        this.groups.trunk.add(tile2);

        let top1 = this.game.add.sprite(
          30,
          Math.ceil(i * 60) + 30,
          "i_tree",
          0,
          this.groups.topside
        );
        top1.anchor.set(0.5, 0.5);
        top1.checkWorldBounds = true;

        let top2 = this.game.add.sprite(
          this.game.width - 30,
          Math.ceil(i * 60) + 30,
          "i_tree",
          0,
          this.groups.topside
        );
        top2.anchor.set(0.5, 0.5);
        top2.checkWorldBounds = true;
      }
    }

    /**
     * Places ground tiles.
     */
    placeTilesGround() {
      for ( let i = -1; i < Math.ceil(this.game.height / 160); i++) {
        let tile = this.game.add.sprite(
          0,
          Math.ceil(i * 160),
          "i_ground",
          0,
          this.groups.tile
        );
        tile.checkWorldBounds = true;
      }
    }

    /**
     * Places the UI.
     */
    placeUI() {
      this.uiHandle.overlay = this.game.add.sprite(
        0,
        0,
        "i_overlay",
        0,
        this.groups.top
      );
      this.uiHandle.overlay.alpha = 0;

      // Add UI
      this.uiHandle.score = this.game.add.text(
        16,
        16,
        "SCORE: " + this.score,
        {
          align: "center",
          fill: "#fff",
          font: "Barlow",
          fontSize: 16,
          fontWeight: 700,
          stroke: "#000",
          strokeThickness: 4
        },
        this.groups.top
      );

      this.uiHandle.time = this.game.add.text(
        16,
        32,
        "PRESENTS: " + this.presents,
        {
          align: "center",
          fill: "#fff",
          font: "Barlow",
          fontSize: 16,
          fontWeight: 700,
          stroke: "#000",
          strokeThickness: 4
        },
        this.groups.top
      );

      this.uiHandle.crash = this.game.add.text(
        16,
        48,
        "CRASHED: " + this.crashed,
        {
          align: "center",
          fill: "#fff",
          font: "Barlow",
          fontSize: 16,
          fontWeight: 700,
          stroke: "#000",
          strokeThickness: 4
        },
        this.groups.top
      );

      this.uiHandle.health = this.game.add.text(
        16,
        64,
        "HEALTH: " + this.health,
        {
          align: "center",
          fill: "#fff",
          font: "Barlow",
          fontSize: 16,
          fontWeight: 700,
          stroke: "#000",
          strokeThickness: 4
        },
        this.groups.top
      );

      this.uiHandle.drunken = this.game.add.text(
        16,
        80,
        "DRUNKEN: " + Math.ceil(this.player.playerDrunken / this.player.playerDrunkenMax * 100) + "%",
        {
          align: "center",
          fill: "#fff",
          font: "Barlow",
          fontSize: 16,
          fontWeight: 700,
          stroke: "#000",
          strokeThickness: 4
        },
        this.groups.top
      );

      this.uiHandle.reset = this.game.add.text(
        this.game.world.centerX,
        this.game.height - 96,
        "Round over, press 'Esc' to\ngo back to title\nor 'Space' to play again",
        {
          align: "center",
          fill: "#edd400",
          font: "Barlow",
          fontSize: 16,
          fontWeight: 700
        },
        this.groups.top
      );
      this.uiHandle.reset.anchor.set(0.5, 0.5);
      this.uiHandle.reset.alpha = 0;
    }
  }
}