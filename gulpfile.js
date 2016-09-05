/**
 * Created by iraquitan on 9/2/16.
 */
/* eslint-env node */
/* eslint-disable no-console */

var gulp = require("gulp");
var sass = require("gulp-sass");
var sourceMaps = require("gulp-sourcemaps");
var jekyll = require("gulp-jekyll-stream");
var ghPages = require("gulp-gh-pages");
var autoprefixer = require("gulp-autoprefixer");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var pump = require("pump");

gulp.task("default", function () {
    console.log("Gulp running...");
});

gulp.task("jekyll", ["styles", "imagemin", "script"], function () {
    return gulp.src(process.cwd())
        .pipe(jekyll({
            bundleExec: true,              // exec jekyll w/ "bundle exec"
            quiet: true,                   // suppress jekyll output; implies "--trace"
            safe: false,                   // run Jekyll in "safe" mode
            cwd: process.cwd(),            // below paths will be relative to this
            layouts: "_layouts",           // where your layouts live
            plugins: "_plugins"            // where your plugins live
            // source: '/path/to/source'   // overrides gulp.src() above
            // destination: '_site'        // can be used instead of gulp.dest()
        }))
        .pipe(gulp.dest("_site"));
});

gulp.task("deploy", function () {
    return gulp.src("_site")
        .pipe(ghPages({
            branch: "master"
        }));
});

gulp.task("styles", function () {
    gulp.src("_sass/**/*.scss")
        .pipe(sourceMaps.init())
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"]
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest("_site/assets/css"));
});

gulp.task("imagemin", function () {
    gulp.src("assets/img/*")
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest("_site/assets/img"));
});

gulp.task("script", function () {
    pump([
        gulp.src("assets/js/*.js"),
        sourceMaps.init(),
        uglify(),
        sourceMaps.write(),
        gulp.dest("_site/assets/js")
    ]);
});