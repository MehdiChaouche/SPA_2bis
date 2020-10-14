// function defaultTask(cb) {
//     console.log("Hello World");
//     cb();
// }

// exports.default = defaultTask

const { task, parallel } = require('gulp');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const imageResize = require('gulp-image-resize');
const imageminMozjpeg = require('imagemin-mozjpeg');
const autoprefixer = require('gulp-autoprefixer');

function imgSquash() {
    return gulp
        .src("images/*")
        .pipe(imagemin([
            imageminMozjpeg({ quality: 75, progressive: true })
        ]))
        // .pipe(rename('newImage.png'))
        .pipe(gulp.dest("build/images"));
}

gulp.task("imgSquash", imgSquash)

function imgResizer() {
    return gulp
        .src("build/images/*")
        .pipe(imageResize({
            width: 560,
            height: 200,
            crop: true,
            upscale: false
        }))
        .pipe(gulp.dest("build/images/"));
}
gulp.task("imgResizer", imgResizer);

function autoPrefixer() {
    return gulp
        .src("style.css")
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('build/css'))
}

gulp.task("autoPrefixer", autoPrefixer);

gulp.task("watch", () => {
    gulp.watch("images/*", imgSquash);
});

gulp.task("default", gulp.parallel("imgSquash", "imgResizer", "autoPrefixer", "watch"));