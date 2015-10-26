var gulp = require('gulp')
justfiles = require('./util/justfiles');

module.exports = function build() {

    var input = this.input(this.srcDir, [
        '**/*.html',
        '!**/*.tpl.html',
        '**/*.js',
        '!/**/*.*.js',
    ]);

    return gulp.src(input)
        .pipe(justfiles())
        .pipe(gulp.dest(this.buildDir));
}