var gulp      = require('gulp');
var transform = require('vinyl-transform');
var pkg       = require('./package.json');

var config = {
  jsFiles: ['*.js', 'test/*.js']
};

gulp.task( 'connect', function(){
  require('gulp-connect').server({
    root: 'public'
  });
});

gulp.task( 'scripts', function(){
  return gulp.src('./public/js/app.js')
    .pipe( transform( function( filename ){
      return require('browserify')( filename ).bundle();
    }))
    .pipe( gulp.dest('./public/dist') );
});

gulp.task( 'less', function(){
  return gulp.src('less/app.less')
    .pipe( require('gulp-less')() )
    .pipe( gulp.dest('public/dist') );
});

gulp.task( 'lint', function(){
  return gulp.src(['*.js', 'test/*.js'])
    .pipe( require('gulp-jshint')( pkg.jshint || {} ) )
    .pipe( require('gulp-jshint').reporter('default') );
});

gulp.task( 'watch', function(){
  gulp.watch( ['*.js', 'test/*.js'], ['lint'] );
  gulp.watch( ['public/js/*.js', 'public/js/**/*.js'], ['scripts'] );
  gulp.watch( ['less/*.less', 'less/**/*.less'], ['less'] );
});

gulp.task( 'default', [ 'less', 'lint', 'scripts', 'connect', 'watch'] );