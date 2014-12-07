var gulp = require('gulp')
var rename = require('gulp-rename')
var jade = require('gulp-jade')
var stylus = require('gulp-stylus')
var less = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var cssmin = require('gulp-cssmin')

// task modern:fonts
gulp.task('modern:fonts', function(){
  return gulp.src([
      'include/modern/fonts/**'
    ])
    .pipe(gulp.dest('dist/web/modern/fonts'))
})

// task modern:fonts
gulp.task('modern:fonts', function(){
  return gulp.src([
      'include/modern/fonts/**'
    ])
    .pipe(gulp.dest('dist/web/modern/fonts'))
})

// task modern:css
gulp.task('modern:css', function(){
  return gulp.src([
      'include/modern/css/modern.css',
      'include/modern/css/modern-responsive.css'
    ])
    .pipe(cssmin())
    .pipe(rename(function(path){
      path.basename += '.min'
    }))
    .pipe(gulp.dest('dist/web/modern/css'))
})

// task modern
gulp.task('modern', ['modern:fonts', 'modern:css'])

// task init
gulp.task('init', ['modern'])

// task web:wxbase
gulp.task('web:wxbase', function(){
  return gulp.src('src/web/wxbase/**')
    .pipe(gulp.dest('dist/web/wxbase'))
})

// task web:html
gulp.task('web:html', function(){
  return gulp.src('src/web/*.jade')
    .pipe(jade())
    .pipe(rename(function(path){
      // todo: lib gulp-html-path
      if (path.basename === 'index') return
      path.dirname += '/frames'
    }))
    .pipe(gulp.dest('dist/web'))
})

// task web:css
gulp.task('web:css', function(){
  return gulp.src('src/web/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/web'))
})

// task web:js
gulp.task('web:js', function(){
  return gulp.src('src/web/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/web'))
})

// task web
gulp.task('web', ['web:wxbase', 'web:html', 'web:css', 'web:js'])

// task build
gulp.task('build', ['web'])

// task default
gulp.task('default', ['build'])
