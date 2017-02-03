var gulp = require('gulp');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require("gulp-plumber");
var cmq = require('gulp-combine-media-queries');
var csscomb = require('gulp-csscomb');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload

// Sass
gulp.task('sass', function () {
    gulp.src('theme-folder/sass/**/*.scss')
        .pipe(sass({
          outputStyle: 'expanded'
        }).on('error', sass.logError)) // Keep running gulp even though occurred compile error
        .pipe(pleeease({
            autoprefixer: { browsers: ['last 2 versions'] },
            minifier: false
        }))
        .pipe(gulp.dest('theme-folder/css'))
        .pipe(reload({stream:true}));
});

// Combine media queries
gulp.task('cmq', function () {
  gulp.src('theme-folder/css/*.css')
    .pipe(cmq({
      log: true
    }))
    .pipe(csscomb())
    .pipe(gulp.dest('theme-folder/css'));
});

// Js-concat-uglify
gulp.task('js', function() {
    gulp.src(['theme-folder/js-script/*.js'])
        .pipe(concat('scripts.js'))
        // .pipe(uglify({preserveComments: 'some'})) // Keep some comments
        .pipe(gulp.dest('theme-folder/js'))
        .pipe(reload({stream:true}));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({        // files to inject
        proxy: 'localhost:8888'
    });
});

// Task for `gulp` command
gulp.task('default',['browser-sync'], function() {
    gulp.watch('theme-folder/sass/**/*.scss',['sass']);
    gulp.watch('theme-folder/js-script/*.js',['js']);
});
