const gulp = require('gulp'),
	mocha = require('gulp-spawn-mocha'),
	istanbul = require('gulp-istanbul'),
	isparta = require('isparta');

gulp.task('watch', function () {
	gulp.watch(['lib/**', 'test/**'], ['mocha']);
});

gulp.task('pre-mocha', function () {
	return gulp.src(['./lib/**/*.js'])
		.pipe(istanbul({includeUntested: true}))
		.pipe(istanbul.hookRequire());
});

gulp.task('mocha', ['pre-mocha'], function () {
	return gulp.src(['./test/*.test.js'], {read: false})
		.pipe(mocha())
		.pipe(istanbul.writeReports({
			dir: './coverage'
		}))
		.pipe(istanbul.enforceThresholds({
			thresholds: {global: 90}
		}));
});

gulp.task('cover', function () {

	return gulp.src(['./test/*.test.js'])
		.pipe(mocha({
			istanbul: true,
			R: 'spec',
			c: true,
			inlineDiffs: true
		}));
});