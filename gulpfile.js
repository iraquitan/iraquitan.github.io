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
var eslint = require("gulp-eslint");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var pump = require("pump");

gulp.task("default", function () {
    console.log("Gulp running...");
});

gulp.task("jekyll", function () {
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

gulp.task("dist", ["jekyll", "styles", "imagemin", "lint", "scripts-dist"], function () {});

gulp.task("gh-pages", function () {
    return gulp.src("_site/**/*")
        .pipe(ghPages({
            branch: "master",
            force: true
        }));
});

gulp.task("deploy", ["dist", "gh-pages"], function () {
    console.log("deploy task done.");
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
    gulp.src("assets/img/**/*")
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest("_site/assets/img"));
});

gulp.task("scripts", function () {
    pump([
        gulp.src("assets/js/*.js"),
        concat("all.js"),
        gulp.dest("_site/assets/js")
    ]);
});

gulp.task("scripts-dist", function () {
    pump([
        gulp.src("assets/js/*.js"),
        sourceMaps.init(),
        concat("all.js"),
        uglify(),
        sourceMaps.write(),
        gulp.dest("_site/assets/js")
    ]);
});

gulp.task("lint", function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(["assets/js/**/*.js"])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format());
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    // .pipe(eslint.failAfterError());
});