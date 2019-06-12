var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();


gulp.task('js', function() {
  return gulp.src(['app/js/**/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Static server
gulp.task('serve', function() {
  browserSync.init({
   server: './dist/'
  });

  gulp.watch('app/js/**/*.js', gulp.series('js'));
  gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('serve'));
