/**
 * Created by iraquitan on 9/2/16.
 */
/* eslint-env node */
/* eslint-disable no-console */

const { src, dest, parallel, series } = require('gulp');
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const jekyll = require("gulp-jekyll-stream");
const ghPages = require("gulp-gh-pages");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const eslint = require("gulp-eslint");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");


function jekyll_task() {
    return src(process.cwd())
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
        .pipe(dest("_site"));
}

function ghp() {
    return src("_site/**/*")
        .pipe(ghPages({
            branch: "master",
            force: true
        }))
}

function css() {
    return src("_sass/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"]
        }))
        .pipe(sourcemaps.write())
        .pipe(dest("_site/assets/css"));
}

function img() {
    src("assets/img/**/*")
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(dest("_site/assets/img"));
}

function js() {
    return src("assets/js/*.js", { sourcemaps: true })
        .pipe(concat("all.js"))
        .pipe(dest("_site/assets/js"))
}

function jsDist() {
    return src("assets/js/*.js", { sourcemaps: true })
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(dest("_site/assets/js"))
}

function lint() {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return src(["assets/js/**/*.js"])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format());
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    // .pipe(eslint.failAfterError());
}

exports.css = css;
exports.js = js;
exports.img = img;
exports.dist = series(jekyll_task, css, img, lint, jsDist);
// exports.deploy = series(di/st, ghp);