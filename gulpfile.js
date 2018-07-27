 //REQUIRES
var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var cssimport = require('postcss-import');
var cssvar = require('postcss-simple-vars');
var cssnested = require('postcss-nested');
var autoprefixer = require('autoprefixer');

//TASKS
gulp.task('css', function() {
	return gulp.src('./app/assets/styles/**/*.css') 
		.pipe(postcss([cssimport, cssvar, autoprefixer({browsers: ['cover 99.5%']}), cssnested]))
		.pipe(gulp.dest('./app/assets/output/css'))
		.pipe(browserSync.stream());
});

gulp.task('browser-sync', ['css'], function() {
	browserSync.init({ server:"app" });

	gulp.watch('app/assets/styles/**/*.css', ['css']);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);