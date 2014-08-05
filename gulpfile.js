var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var hbsfy = require('hbsfy');


gulp.task('sass', function(){
	return gulp.src('./css/src/base.scss')
		.pipe(plugins.sass())
        .pipe(plugins.autoprefixer(
            'last 2 version',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
        ))
		.pipe(gulp.dest('./css'));
});

gulp.task('lint', function(){
    return gulp.src('./js/src/*.js')
        .pipe(plugins.plumber())
        .pipe(plugins.jshint('./.jshintrc'))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('build', ['lint'], function(){
	return gulp.src('./js/app.js')
        .pipe(plugins.plumber())
        .pipe(plugins.browserify({
        	debug: true,
            transform: [hbsfy]
        }))
        .pipe(plugins.concat('build.js'))
		.pipe(gulp.dest('./js/build'));

});

gulp.task('default', function(){
	gulp.start('sass', 'build');
});

gulp.task('watch', function(){
    gulp.watch('css/src/**/*.scss', ['sass']);
    gulp.watch('js/*.js', ['build']);
    gulp.watch('js/src/*.js', ['build']);
    gulp.watch('js/src/**/*.js', ['build']);
    //gulp.watch('js/tests/**/*.js', ['build'])
    // gulp.watch('src/**/*.hbs', ['debug']);
});