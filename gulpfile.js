var gulp  = require('gulp');
var duo   = require('duo');
var pkg   = require('./package.json');

var config = {
  jsFiles: ['*.js', 'test/*.js']
};

gulp.task( 'connect', function(){
  require('gulp-connect').server({
    root: 'public'
  });
});

gulp.task( 'less', function(){
  return gulp.src('less/app.less')
    .pipe( require('gulp-less')() )
    .pipe( gulp.dest('public/dist') );
});

gulp.task( 'lint', function(){
  return gulp.src( config.jsFiles )
    .pipe( require('gulp-jshint')( pkg.jshint || {} ) )
    .pipe( require('gulp-jshint').reporter('default') );
});

gulp.task( 'watch', function(){
  gulp.watch( config.jsFiles, ['lint'] );
  gulp.watch( ['less/*.less', 'less/**/*.less'], ['less'] );
});

gulp.task( 'default', [ 'less', 'lint', 'connect', 'watch'] );