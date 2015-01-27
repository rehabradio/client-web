var dotenv = require('dotenv'),
    envify = require('envify/custom'),
    fs = require('fs');

dotenv.load();

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var hbsfy = require('hbsfy');
var gutil = require('gulp-util');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var yuidoc = require('gulp-yuidoc');
var jsdoc = require('gulp-jsdoc');

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
            transform: [hbsfy, envify({
                NODE_ENV: process.env.NODE_ENV,
                API_ROOT: process.env.API_ROOT,
                SOCKETS_URL: process.env.SOCKETS_URL
            })]
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

function transformSvg (svg, cb) {
    svg.attr({ style: 'display:none' });
    svg.find('//*[@fill]').forEach(function (child) {
        child.attr('fill').remove()
    });
    cb(null);
}

gulp.task('svg', function(){
     var svg = gulp.src('svg/*.svg')
        .pipe(svgmin())
        .pipe(svgstore({fileName: 'icons.svg', prefix: 'icon-', transformSvg: transformSvg}))
        .pipe(gulp.dest('img/'));

    function fileContents (filePath, file) {

        // Remove the xml declaration and doctype

        return file.contents.toString('utf8').replace('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">', '');
    }

    return gulp
        .src('./views/layouts/base.html')
        .pipe(plugins.inject(svg, {transform: fileContents}))
        .pipe(gulp.dest('./views/layouts'));
});

gulp.task('makedocs', function(){
    gulp.src(['./js/*.js', './js/src/**/*.js', './modules/**/**/*.js'])
        .pipe(jsdoc())
        // .pipe(yuidoc())
        .pipe(gulp.dest('./docs'));
});

gulp.task('default', function(){
    gulp.start('sass', 'build');
});

gulp.task('watch', function(){
    gulp.watch('css/src/**/*.scss', ['sass']);
    gulp.watch('modules/**/assets/scss/*.scss', ['sass']);
    gulp.watch('modules/**/*.js', ['build']);
    gulp.watch('modules/**/templates/*.hbs', ['build']);
    gulp.watch('js/*.js', ['build']);
    gulp.watch('js/src/*.js', ['build']);
    gulp.watch('js/src/**/*.js', ['build']);
    gulp.watch('js/src/components/**/*.hbs', ['build']);
    gulp.watch('js/jasmine/mocks.js', ['build']);
    gulp.watch('js/jasmine/data/*.js', ['build']);
    gulp.watch('svg/*.svg', ['svg']);
});