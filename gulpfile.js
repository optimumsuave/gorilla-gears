var gulp    = require('gulp');
var sass    = require('gulp-sass');
var watch   = require('gulp-watch');
var rename  = require('gulp-rename');
var uglify  = require('gulp-uglify');
 
gulp.task('sass', function () {
  	gulp.src('assets/scss/main.scss')
    	.pipe(sass({
      	errLogToConsole: true,
      	style: 'compress',
      	includePaths: require('node-bourbon').includePaths
    	}))
    	.pipe(gulp.dest('assets/css'));
});

gulp.task('compress', function() {
  return gulp.src('assets/js/src/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('assets/js/src'));
});

gulp.task('watch', function() {
	gulp.watch('assets/scss/*.scss', function() {
    gulp.start('sass');
  });
  gulp.watch('assets/js/src/app.js', function() {
		gulp.start('compress');
	});
});

gulp.task('default', ['sass', 'compress', 'watch']);