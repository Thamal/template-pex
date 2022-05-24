const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const postcss = require("gulp-postcss");
const concat = require('gulp-concat');
const Fiber = require('fibers');
const del = require('del');
const fileinclude = require('gulp-file-include');

sass.compiler = require('sass');

const paths = {
    src: "./src/",
    dest: "./dist/",
    styles: {
        src: "./src/scss/**/*.scss",
        dest: "./dist/css/"
    },
    js: {
        src: "./src/js/*",
        dest: "./dist/js/"
    },
    images: {
        src: "./src/img/**/*",
        dest: "./dist/img"
    },
};

function scssTask(){
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({fiber: Fiber})).on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(concat('styles.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
}

// Clean
function cleanTask() {
    return del([paths.dest])
}

function jsTask() {
    return gulp.src('src/js/scripts.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(paths.js.dest))
}

function jsVendorTask() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
    ])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat('vendors.min.js'))
        .pipe(concat('libraries.min.js'))
        .pipe(gulp.dest(paths.js.dest))
}

function imgTask() {
    return gulp.src(paths.images.src + '*.{jpg,jpeg,png,gif,svg}')
        .pipe(gulp.dest(paths.images.dest));
}

// Watch Task
function watchTask() {
    gulp.watch(paths.styles.src, scssTask);
    gulp.watch(paths.js.src, jsTask);
}

gulp.task('dev'  , gulp.series( scssTask, jsTask, jsVendorTask, imgTask, watchTask));
gulp.task('build', gulp.series( scssTask, jsTask, jsVendorTask, imgTask));

// Default Gulp task
exports.scssTask = scssTask
exports.imgTask = imgTask
exports.jsTask = jsTask
exports.jsVendorTask = jsVendorTask
exports.watchTask = watchTask
exports.cleanTask = cleanTask

