var gulp = require('gulp'),
browserSync = require('browser-sync').create(),
sass = require('gulp-sass'),
concat = require('gulp-concat'),
minify = require('gulp-minify-css'),
autoprefixer = require('gulp-autoprefixer'),
sourcemaps = require('gulp-sourcemaps'),
del = require('del'),
zip = require('gulp-zip');

var DIST_PATH = 'app/dist';
var SCRIPTS_PATH = 'app/src/js/**/*.js';
var SCSS_PATH = 'app/src/scss/**/*.scss';

// Compile SASS into CSS && auto-inject into browser
gulp.task('sass', function() {
  console.log('Executing Sass Task');
	return	gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'app/src/scss/*.scss'])
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(sass())
		.pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH+'/css'))
		.pipe(browserSync.stream());
});


// Move Bootstrap's JS Files to Dist Folder
gulp.task('js', function() {
	console.log('Executing Bootstraps JS Task');
	return	gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH+'/js'))
		.pipe(browserSync.stream());
});

// Move Local JS Files 
gulp.task('scripts', function() {
  console.log('Executing Local Scripts Task');
  return gulp.src(SCRIPTS_PATH)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write()) 
    .pipe(gulp.dest(DIST_PATH+'/js'))
    .pipe(browserSync.stream());
});



// Static Server && Watching scss, scripts, and html files
gulp.task('serve', ['sass'], function() {
	browserSync.init({
		notify: false,
		server: "./app"
	});

gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'app/src/scss/**/*.scss'], ['sass']);
gulp.watch(SCRIPTS_PATH, ['scripts']);
gulp.watch("app/*.html").on('change', browserSync.reload);

});



gulp.task('default', ['js', 'serve', 'scripts', 'sass']);


// Clean Task
gulp.task('clean', function() {
  console.log('Executing Clean Task');
  return del.sync([
      DIST_PATH
    ]);
});


// Export Task
gulp.task('export', function() {
  console.log('Executing Export Task');
  return gulp.src('app/**/*')
    .pipe(zip('BS4-V4.zip'))
    .pipe(gulp.dest('./'))
});
