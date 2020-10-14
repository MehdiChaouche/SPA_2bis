const { task } = require('gulp');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

// exports.default = () => (
//     gulp.src('images/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('build/images'))
// );

function imgSquash() {
    return gulp
        .src("images/*")
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 75, progressive: true })
        ]))
        .pipe(gulp.dest("build/images"));
}

gulp.task("imgSquash", imgSquash)

gulp.task("watch", () => {
    gulp.watch("images/*", imgSquash);
});

gulp.task("default", gulp.series("imgSquash", "watch"));
console.log("Successfully goes through gulpimagemin");