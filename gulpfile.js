var gulp    = require('gulp');
var sass    = require('gulp-sass');
var watch   = require('gulp-watch');
var rename  = require('gulp-rename');
var uglify  = require('gulp-uglify');
var gutil   = require('gulp-util');
var notify   = require('gulp-notify');


function handleError(err) {
  gutil.log(gutil.colors.red(err));
}

gulp.task('sass', function () {
	gulp.src('assets/scss/main.scss')
  	.pipe(sass({
    	style: 'compress',
      outputStyle: 'compressed',
    	includePaths: require('node-bourbon').includePaths
  	}).on('error', handleError))
  	.pipe(gulp.dest('assets/css'));
});

gulp.task('compress', function() {
  return gulp.src('assets/js/src/app.js')
    .pipe(uglify().on('error', handleError))
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('assets/js/src'));
});

gulp.task('watch', ['sass', 'compress'], function() {
  gulp.watch('assets/scss/*.scss', function() {
    gulp.start('sass');
  });
  gulp.watch('assets/js/src/app.js', function() {
		gulp.start('compress');
	});
});

gulp.task('default', ['sass', 'compress', 'watch']);