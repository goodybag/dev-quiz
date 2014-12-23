var gulp      = require('gulp');
var transform = require('vinyl-transform');
var pkg       = require('./package.json');

var config = {
  scripts: ['public/js/*.js', 'public/data/*.js', 'public/js/**/*.js', 'public/js/**/**/*.js']
};

config.lint = config.scripts.concat(['*.js', 'test/*.js']);

gulp.task( 'connect', function(){
  require('gulp-connect').server({
    root: 'public'
  });
});

gulp.task( 'scripts', function(){
  return gulp.src('./public/js/app.js')
  .pipe( transform( function( filename ){
    return require('browserify')({
      debug: true
    })
    .add( filename )
    .bundle();
  }))
  .pipe( gulp.dest('public/dist') );
});

gulp.task( 'font-awesome', function(){
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe( gulp.dest('public/dist/font') );
});

gulp.task( 'less', function(){
  return gulp.src('less/app.less')
    .pipe( require('gulp-less')() )
    .pipe( gulp.dest('public/dist') );
});

gulp.task( 'lint', function(){
  return gulp.src( config.lint )
    .pipe( require('gulp-jshint')( pkg.jshint || {} ) )
    .pipe( require('gulp-jshint').reporter('default') );
});

// gulp-eslint causing too much heartache right now
// gulp.task( 'lint', function(){
//   var eslint = require('gulp-eslint');

//   return gulp.src( config.lint )
//     .pipe( eslint({
//       rules: {
//         'no-multi-spaces':  0
//       , 'quotes':           'single'
//       }
//     , globals: {
//         'jQuery': true
//       , '$': true
//       }
//     , envs: ['browser', 'node']
//     }))
//     .pipe( eslint.format('checkstyle') )
//     .pipe( eslint.failOnError() );
// });

gulp.task( 'watch', function(){
  gulp.watch( config.lint, ['lint'] );
  gulp.watch( config.scripts, ['scripts'] );
  gulp.watch( ['less/*.less', 'less/**/*.less'], ['less'] );
});

gulp.task( 'build', [ 'font-awesome', 'less', 'lint', 'scripts' ] );
gulp.task( 'default', [ 'build', 'connect', 'watch' ] );