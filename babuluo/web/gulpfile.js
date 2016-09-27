"use strict";

var gulp = require('gulp'),
    path = require('path'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    ngAnnotate = require('gulp-ng-annotate'),
    del = require('del');

// Check JavaScript
gulp.task('jshint', function() {
    return gulp.src(['app/**/*.js', '!app/components/libs/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// Delete dist
gulp.task('clean', function() {
    return del(['dist']);
});

// Copy fonts
gulp.task('copyfonts', ['clean'], function() {

    // Font-awesome
    gulp.src('./app/components/libs/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/pages/fonts'));

    // Bootstrap glyphicon
    gulp.src('./app/components/libs/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/pages/fonts'));
});

// Images
gulp.task('imagemin', function() {
    return gulp.src(['app/**/*.{png, jpg, gif}'])
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});

gulp.task('usemin', ['jshint'], function() {
    return gulp.src('./app/**/*.html')
        .pipe(usemin({
            css: [minifycss(), rev()],
            js: [ngAnnotate(), uglify(), rev()]
        }))
        .pipe(gulp.dest('dist/'));
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('usemin', 'imagemin', 'copyfonts');
});

// Watch
gulp.task('watch', ['browser-sync'], function() {

    // Watch js, css, html files
    gulp.watch('{app/**/*.js,app/**/*.css,app/**/*.html}', ['usemin']);

    // Watch images
    gulp.watch('app/**/*.{jpg, png, gif}');

    // Watch tpl files
    gulp.watch('app/views/*', ['usemin']);

});

gulp.task('browser-sync', ['default'], function() {
    var files = [
        'app/**/*.html',
        'app/**/*.css',
        'app/**/*.png',
        'app/**/*.js',
        'dist/**/*'
    ];

    browserSync.init(files, {
        port: 3001,

        server: {
            baseDir: "dist/",
            index: "index.html"
        }
    });

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', browserSync.reload);
});
