var gulp = require('gulp')
    , less = require('gulp-less')
    , concat = require('gulp-concat');

module.exports = function () {

    var input = this.input(this.srcDirCss, [this.buildName + '.less']);

    return gulp.src(input)
        .pipe(less())
        .pipe(concat(this.buildName + '.css'))
        .pipe(gulp.dest(this.buildDir));

}
