#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const program = require("commander");
const version = require("./package.json").version;
const npm = require("npm");

const copyDir = require("./Algorithm/copyDir");

program
  .version( version )
  .option( "-b, --basic", "basic arch" )
  .option( "-r, --recommend", "recommend arch" )
  .option( "-a, --advanced", "advanced arch" )
  .arguments("projectName")
  .action( projectName => {
    fs.stat( projectName, ( err, result ) => {
      if( err ){
        fs.mkdirSync( path.resolve( "./", projectName ) );
        fs.writeFile( projectName + "/.gitignore", "node_modules" );
        var arch = "recommend";
        var dependencies = [
          "simple-direct@latest",
          "connect-redis@^3.3.3",
          "direct-core@latest",
          "file-loader@^1.1.11",
          "helmet@^3.12.0",
          "material-ui@^0.20.0",
          "multer@^1.3.0",
          "offline-plugin@^5.0.3",
          "raw-loader@^0.5.1",
          "redis@^2.8.0",
          "redux-thunk@^2.2.0",
          "url-loader@^1.0.1",
          "webpack-bundle-analyzer@^2.11.1"
        ]
        if( program.basic ){
          arch = "basic";
          dependencies = ["simple-direct@latest"];
        }
        if( program.advanced ){
          arch = "advanced";
          dependencies = [
            "simple-direct@latest",
            "@fortawesome/fontawesome@^1.1.5",
            "@fortawesome/fontawesome-free-brands@^5.0.11",
            "@fortawesome/fontawesome-free-regular@^5.0.11",
            "@fortawesome/fontawesome-free-solid@^5.0.10",
            "@fortawesome/react-fontawesome@0.0.18",
            "autoprefixer@^8.4.1",
            "connect-redis@^3.3.3",
            "direct-core@latest",
            "express-graphql@^0.6.12",
            "file-loader@^1.1.11",
            "graphql@^0.13.2",
            "helmet@^3.12.0",
            "immutable@^3.8.2",
            "marked@^0.3.19",
            "material-ui@^0.20.0",
            "multer@^1.3.0",
            "offline-plugin@^5.0.3",
            "raw-loader@^0.5.1",
            "recompose@^0.27.0",
            "redis@^2.8.0",
            "redux-logger@^3.0.6",
            "redux-thunk@^2.2.0",
            "redux-fetch-thunk@1.0.1",
            "reselect@^3.0.1",
            "url-loader@^1.0.1",
            "webpack-bundle-analyzer@^2.11.1"
          ];
        }
        if( program.recommend ){
          arch = "recommend";
          dependencies = [
            "autoprefixer@^8.4.1",
            "connect-redis@^3.3.3",
            "direct-core@^1.4.6",
            "file-loader@^1.1.11",
            "helmet@^3.12.0",
            "material-ui@^0.20.0",
            "multer@^1.3.0",
            "offline-plugin@^5.0.3",
            "raw-loader@^0.5.1",
            "redis@^2.8.0",
            "redux-thunk@^2.2.0",
            "simple-direct@^3.9.5",
            "url-loader@^1.0.1",
            "webpack-bundle-analyzer@^2.11.1"
          ];
        }
        copyDir( `${__dirname}/arch/${arch}`, path.resolve( "./", projectName ), "" );
        process.chdir( projectName );
        npm.load( () => {
          npm.commands.init( () => {
            console.log(" ----- start install direct ----");
            npm.commands.install( dependencies, ( err, data ) => {
              console.log(" ------- installed completed! ------");
            });
          });
        })
      } else {
        console.log( projectName + " already exist");
      }
    });
  })
  .parse( process.argv )
;
