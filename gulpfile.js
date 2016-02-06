'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var compass = require('gulp-compass');
var cssmin = require('gulp-cssmin');

gulp.task('scripts', function(){
  return gulp.src('./src/ng-circle.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
  return gulp.src('./src/ng-circle.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: './dist/css',
      sass: './src',
      comments: true,
      sourcemap: true
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(cssmin())
    .pipe(rename({ extname: '.min.css'}))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
  gulp.watch('./src/ng-circle.js', ['scripts']);
  gulp.watch('./src/ng-circle.scss', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);

gulp.task('styles:demo', function () {
  return gulp.src('./demo/demo.scss')
    .pipe(compass({
      //config_file: './config.rb',
      css: './demo/css',
      sass: './demo',
      comments: true,
      sourcemap: true
    }))
    .pipe(gulp.dest('./demo/css'))
    .pipe(cssmin())
    .pipe(rename({ extname: '.min.css'}))
    .pipe(gulp.dest('./demo/css'));
});

gulp.task('watch:demo', function() {
  //gulp.watch('./demo/demo.js', ['scripts']);
  gulp.watch('./demo/demo.scss', ['styles:demo']);
});

gulp.task('demo', ['styles:demo', 'watch:demo']);
