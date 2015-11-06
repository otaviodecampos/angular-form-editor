var gulp = require('gulp')
    , es = require('event-stream');

module.exports = function build() {

    return gulp.src(this.vendorFonts)
        .pipe(gulp.dest(this.buildFonts));
}