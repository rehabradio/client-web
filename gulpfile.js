var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var hbsfy = require('hbsfy');

var jasminePhantomJs = require('gulp-jasmine2-phantomjs');


gulp.task('sass', ['build-modules-scss'], function(){
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

gulp.task('build-modules-scss', function(){
    return gulp.src('modules/**/assets/scss/*.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.concat('modules.scss'))
        .pipe(gulp.dest('css/src/'))
});

gulp.task('jasmine', ['build-test-suites'], function(){
    return gulp.src('js/jasmine/spec-runner.html')
        .pipe(jasminePhantomJs());
});

gulp.task('build-test-suites', ['lint'], function(){
    return gulp.src('./js/jasmine/spec.js')
        .pipe(plugins.plumber())
        .pipe(plugins.browserify({
            debug: true
        }))
        .pipe(plugins.concat('build.js'))
        .pipe(gulp.dest('./js/jasmine/build'));

});

gulp.task('default', function(){
    gulp.start('sass', 'build', 'jasmine');
});

gulp.task('watch', function(){
    gulp.watch('css/src/**/*.scss', ['sass']);
    gulp.watch('js/*.js', ['build']);
    gulp.watch('js/tests/*.js', ['build']);
    gulp.watch('js/src/*.js', ['build']);
    gulp.watch('js/src/**/*.js', ['build']);
    gulp.watch('js/jasmine/specs/*.js', ['jasmine']);
    gulp.watch('js/jasmine/spec.js', ['jasmine']);
});