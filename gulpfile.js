/**
 * Created by iraquitan on 9/2/16.
 */
/* eslint-env node */
/* eslint-disable no-console */

const { src, dest, parallel, series } = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const ghPages = require('gulp-gh-pages')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const eslint = require('gulp-eslint')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const cp = require('child_process')

// Jekyll
function jekyllBuild () {
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' })
}
function jekyllServe () {
//   return cp.spawn('bundle', ['exec', 'jekyll', 'serve', '--quiet', '--drafts'], { stdio: 'inherit' })
  return cp.spawn('bundle', ['exec', 'jekyll', 'serve', '--drafts'], { stdio: 'inherit' })
}
const jekyll = series(parallel(css, img, js, vendorJs), jekyllServe)

function ghp () {
  return src('_site/**/*')
    .pipe(ghPages({
      branch: 'master',
      force: true
    }))
}

function css () {
  return src('_sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('assets/css'))
}

function img () {
  return src('_assets/img/**/*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(dest('assets/img'))
}

function js () {
  return src('_assets/js/*.js', { sourcemaps: true })
    .pipe(concat('all.js'))
    .pipe(dest('assets/js'))
}

function jsDist () {
  return src('_assets/js/*.js', { sourcemaps: true })
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(dest('assets/js'))
}

function vendorJs () {
  return src('_assets/vendor/**/*.js', { sourcemaps: true })
    // .pipe(concat('vendor.js'))
    .pipe(dest('assets/vendor'))
}

function vendorJsDist () {
  return src('_assets/vendor/**/*.js', { sourcemaps: true })
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(dest('assets/js'))
}

function lint () {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return src(['assets/js/**/*.js'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    // .pipe(eslint.failAfterError());
}

const dist = series(jekyllBuild, parallel(css, img, jsDist))

const deploy = series(dist, ghp)

exports.jekyll = jekyll
exports.css = css
exports.js = js
exports.img = img
exports.dist = dist
exports.deploy = deploy
