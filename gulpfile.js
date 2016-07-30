"use strict";

let gulp = require("gulp");
let mocha = require("gulp-mocha");
let util = require("gulp-util");
let nodemon = require("gulp-nodemon");

gulp.task("run", function () {
    return gulp.src(['**/*Tests.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', util.log);
});

gulp.task("watch-run", function () {
    gulp.watch(['**/*.js'], ['run']);
});
