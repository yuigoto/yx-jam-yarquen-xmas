/**
 * YX : YARQUEN JAM
 * ======================================================================
 * Index JS file.
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

// Set environment
require("dotenv").config();

// Require libs
const async   = require("async");
const copy    = require("copy");
const express = require("express");
const fs      = require("fs");
const path    = require("path");
const sass    = require("node-sass");

// Define build path
const OUT_DIR     = process.env.OUT_DIR || "build";
const BUILD_PATH  = path.resolve(__dirname, OUT_DIR) + "\\";

// Define app handler and params
const APP       = express();
const APP_PORT  = process.env.PORT || 1280;
const APP_MODE  = process.env.NODE_ENV || "development";

// Execute build
async.series(
  [
    // Copying assets
    // ------------------------------------------------------------------
    callback => {
      copy(
        [
          "assets/**/*",
        ],
        "build/assets",
        null,
        function (err, files) {
          callback(err, files);
        }
      );
    },
    // Copy node assets
    // ------------------------------------------------------------------
    callback => {
      copy(
        [
          "node_modules/phaser-ce/build/phaser*.*"
        ],
        "build/assets/js",
        null,
        function (err, files) {
          callback(err, files);
        }
      );
    },
    // Copy static files
    // ------------------------------------------------------------------
    callback => {
      copy(
        [
          "static/**/*"
        ],
        "build",
        null,
        function (err, files) {
          callback(err, files);
        }
      );
    },
    // Transpile SCSS
    // ------------------------------------------------------------------
    callback => {
      // Set build dir and paths
      let CSS_DIR   = "build/assets/css/",
          CSS_MAP   = "main.css.map",
          CSS_FILE  = "main.css";

      // Transpile!
      sass.render(
        {
          file: "scss/main.scss",
          outFile: CSS_DIR + CSS_FILE,
          outputStyle: "compressed",
          precision: 8,
          sourceMap: true
        },
        (err, result) => {
          fs.mkdirSync(CSS_DIR);
          fs.writeFileSync(
            CSS_DIR + CSS_FILE,
            result.css.toString(),
            (err) => {
              if (err) console.log(`Could not save ${CSS_FILE}`);
            }
          );
          fs.writeFileSync(
            CSS_DIR + CSS_MAP,
            result.map.toString(),
            (err) => {
              if (err) console.log(`Could not save ${CSS_MAP}`);
            }
          );
          callback(err, result);
        }
      );
    },
    // Serve!
    // ------------------------------------------------------------------
    callback => {
      APP.use("/", express.static("build"));
      APP.use("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, OUT_DIR, "index.html"));
      });
      APP.listen(APP_PORT, (err) => {
        if (err) console.error(err);
        console.log("Running on port: " + APP_PORT);
      });
    }
  ],
  (err, result) => {
    if (err) {
      console.error(err);
      console.error(result);
    }
  }
);
module.exports  = APP;
