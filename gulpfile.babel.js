"use strict";
import gulp from "gulp";
import babel from "gulp-babel";

const dirs = {
    src: "./src",
    lib: "./lib"
};
const es6Path = {
    src: `${dirs.src}/` + `**/*.js`,
    lib: `${dirs.lib}/`
};
gulp.task("babel",()=>{
    return gulp.src(es6Path.src)
        .pipe(babel())
        .pipe(gulp.dest(es6Path.lib));
});

gulp.task("watch",()=>{
    gulp.watch(es6Path.src,["babel"]);
});