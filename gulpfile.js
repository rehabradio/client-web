var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var hbsfy = require('hbsfy');
var gutil = require('gulp-util');

// var jasminePhantomJs = require('gulp-jasmine2-phantomjs');
var karma = require('karma').server;
var karmaConfig = require('./karma-config.js');

var onError = function (err) {  
    gutil.beep();
};

/*
 *  Gulp sass
 */

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
		.pipe(gulp.dest('./css'))
        .pipe(plugins.notify({
            title: 'SASS',
            message: 'CSS build complete'
        }));
});

/*
 *  Because the scss files for the separate modules are stored in the respective module folder this task is used to concatenate them 
 *  before the sass task is run.
 */

gulp.task('build-modules-scss', function(){
    return gulp.src('modules/**/assets/scss/*.scss')
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(plugins.concat('modules.scss'))
        .pipe(gulp.dest('css/src/'))
});

/*
 *  Check code integrity before the build task is run
 */

gulp.task('lint', function(){
    return gulp.src(['./js/src/*.js', 'modules/**/*.js'])
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(plugins.jshint('./.jshintrc'))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

/*
 *  After the code has been linted the browserify plugin is run.
 */

gulp.task('build', ['lint'], function(){
	return gulp.src('./js/app.js')
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(plugins.browserify({
        	debug: true,
            transform: [hbsfy]
        }))
        .on('error', gutil.log)
        .pipe(plugins.concat('build.js'))
		.pipe(gulp.dest('./js/build'))
        .pipe(plugins.notify({
            title: 'Build',
            message: 'Javascript build complete'
        }));
});


gulp.task('karma', ['build-test-suites'], function(done){
    karma.start(karmaConfig, done);
});

gulp.task('build-test-suites', ['lint'], function(){
    return gulp.src(['./js/jasmine/spec.js', './modules/**/tests/*.js'])
        .pipe(plugins.concat('build.js'))
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(plugins.browserify({
            debug: true
        }))
        .pipe(gulp.dest('./js/jasmine/build'));

});

gulp.task('default', function(){
    gulp.start('sass', 'build');
});

gulp.task('watch', function(){
    gulp.watch('css/src/**/*.scss', ['sass']);
    gulp.watch('modules/**/*.js', ['build']);
    gulp.watch('js/*.js', ['build']);
    gulp.watch('js/src/*.js', ['build']);
    gulp.watch('js/src/**/*.js', ['build']);
    gulp.watch('js/jasmine/mocks.js', ['build']);
    gulp.watch('js/jasmine/data/*.js', ['build']);
});