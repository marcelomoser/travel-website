 //REQUIRES
var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var cssimport = require('postcss-import');
var cssvar = require('postcss-variables');
var cssnested = require('postcss-nested');
var autoprefixer = require('autoprefixer');
var mixins = require('postcss-mixins');
var hexrgba = require('postcss-hexrgba')

//TASKS

//POSTCSS
gulp.task('css', function() {
	return gulp.src('./app/assets/styles/**/*.css') 
		.pipe(plumber(function(err) {
			console.log('err');
			this.emit('end');
		}))
		.pipe(postcss([cssimport, mixins, cssvar, hexrgba, autoprefixer({browsers: ['cover 99.5%']}), cssnested]))
		.pipe(gulp.dest('./app/assets/output/css'))
		.pipe(browserSync.stream());
});

//BROWSER-SYNC
gulp.task('browser-sync', ['css'], function() {
	browserSync.init({ server:"app" });

	gulp.watch('app/assets/styles/**/*.css', ['css']);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

//DEFAULT
gulp.task('default', ['browser-sync']);