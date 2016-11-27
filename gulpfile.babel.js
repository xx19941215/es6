"use strict";
import gulp from "gulp";
import babel from "gulp-babel";
import babelify from "babelify";
let browserify = require("browserify");
let source = require("vinyl-source-stream");
let buffer = require("vinyl-buffer");
//import fs from "fs";
const dirs = {
    src: "./src",
    lib: "./lib"
};
const es6Path = {
    src: `${dirs.src}/` + "**/*.js",
    lib: `${dirs.lib}/`,
    entry: `${dirs.src}/` + "tetris-es6/js/tetris-es6.js"
};
gulp.task("babel",()=>{
    return gulp.src(es6Path.src)
        .pipe(babel())
        .pipe(gulp.dest(es6Path.lib));
});

gulp.task("build-js",()=>{
    //return browserify("./src/tetris-es6/js/tetris-es6.js")
    //.transform(babelify,{"presets": ["es2015"]})
    //.bundle()
    ////.pipe(source())
    ////.pipe(buffer())
    //.pipe(gulp.dest("./lib/tetris-es6/js/"));

    browserify({
        entries: "./src/tetris-es6/js/tetris-es6.js",
        debug: true
    })
        .transform(babelify,{"presets": ["es2015"]})
        .bundle()
        .pipe(source("tetris-es6.js"))
        .pipe(gulp.dest("./lib/tetris-es6/js/"));
});

gulp.task("watch",()=>{
    gulp.watch(es6Path.src,["build-js"]);
});