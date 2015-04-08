var gulp = require('gulp');
// bootstrap vars
var fs = require('fs');

// watch vars
var livereload = require('gulp-livereload');
var config = require('./config');
var http = require('http');
// copy_over vars
var changed = require('gulp-changed');
// less vars
var less = require('gulp-less');
var path = require('path');
//var minifyCSS = require('gulp-minify-css');

// browserify vars
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// serve vars
var connect = require('connect');
// open vars
//var open = require('gulp-open');

var jshint = require('gulp-jshint');


	
// Tasks
gulp.task('default', ['watch', 'build', 'serve']);//, 'open'


// Watch
gulp.task('watch', function() {
	var server = livereload();
	var reload = function(file) {
		//console.log(file.path);
		server.changed(file.path);
	};
	var ignore = '!./src/{less,less/**,images,images/**,js,js/*.js}';
	
	gulp.watch('src/js/*.js', ['browserify'])
	.on('change', reload);
	
	gulp.watch(['src/**', ignore], ['copy_over'])
	.on('change', reload);
	
	gulp.watch('src/less/**', ['less'])
	.on('change', reload);
	
	//gulp.watch('build/**').on('change', reload);
	
	/*
	return gulp.watch('build/**', function () {
		console.log('build');
	}).on('change', reload);
	*/
	
	
	//gulp.watch('src/images/**', ['images'])
	//.on('change', reload);

	//gulp.watch(['build/**']).on('change', reload);
	
	return gulp;
});
// Build
gulp.task('build', ['browserify', 'less', 'copy_over']);//, 'images'

	// Copy Html Files
	gulp.task('copy_over', function () {
		var dest = './build/';
		///(\.(js|coffee)$)/i.test(path.extname(name));
		var ignore = '!./src/{less,less/**,js,js/**}';//js/lib,js/lib/**//images,images/**,
		return gulp.src(['./src/**', ignore]).pipe(changed(dest)).pipe(gulp.dest(dest));
	});
	// Compile LESS
	gulp.task('less', function () {
		var src = './src/less/**/*.less';
		var dest = './build/css/';
		return gulp.src(src)
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.on('error', function (error) {
			console.log('LESS ERR:', error);
		})
		//.pipe(minifyCSS({keepBreaks:false}))
		.pipe(changed(dest))
		.pipe(gulp.dest(dest));
	});
	// Browserify
	gulp.task('browserify', function() {
		var src = './src/js/global.js';
		var dest = './build/js/';
		
		// browserify & minification version
		
		return browserify(src, { debug : true })
			.bundle()
			.on('error', function (error) {
				console.log('browserify error:', error);
			})
			.pipe(source('global.js'))
			//.pipe(streamify(uglify()))
			.pipe(streamify(jshint()))
			.pipe(gulp.dest(dest));
		
		
		// gulp.src(src)
		// .pipe(browserify({ debug : true }))
		//.pipe(changed(dest))
		//.pipe(gulp.dest(dest));
		
	});
// Serve
gulp.task('serve', function(){
	var app = connect()
		.use(connect.logger('dev'))
		.use(connect.static(config.root));
	
	config.server = http.createServer(app).listen(config.port);
	config.app = app;
});
// Open
gulp.task('open', ['build'], function() {
	var options = {
		url: 'http://localhost:' + config.port,
		livereload : true//,
		//app: 'google chrome'
	};

	return gulp.src('./build/index.html').pipe(open('', options));
});


// bootstrap : copies all folders and files from bootstrap/ dir.
gulp.task('bootstrap', function () {
	var dest = './src/';// where to copy files to
	var path = '../bootstrap';
	fs.stat(path, function (err, stats) {

		// exist
		if (typeof stats !== 'undefined' && stats.isDirectory()) {
			gulp.src(path + '/**').pipe(gulp.dest(dest));
		} else {
			console.log('something went wrong', err, stats.isDirectory());
		}
	});

	return gulp;
});
