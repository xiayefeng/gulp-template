
const { series, parallel, src, dest, watch } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const autoprefixer = require('autoprefixer')
const clean = require('gulp-clean')
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');

sass.compiler = require('node-sass')

function watchList(){
  watch('public/css/*.scss', scssTocss)
}

function scssTocss(){
  return src('public/css/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(dest('public/css/'))
}

function cleanFile(cb){
  return src('dist/', {read: false})
         .pipe(clean())
}

function build(cb){
  cb()
}

exports.watch = watchList
exports.build = build

exports.default = series(cleanFile, parallel(css, javascript, html, img))

function css(cb){
  return src('public/css/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(sourcemaps.write('./maps'))
  .pipe(dest('dist/css'))
}

function javascript(cb) {
  return src('public/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('dist/js'));
}

function html(cb){
  return src('public/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
}

function img(){
  return src('public/img/*')
    .pipe(dest('dist/img'))
}