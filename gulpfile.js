/**
 * Created by aaron.jin on 15/6/8.
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    bourbon=require('node-bourbon'),
    karma = require('karma').server;


// ������
gulp.task('watch', function() {
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/images/**/*', ['images']);

    //var server = livereload();
    //// ��������λ�� dist/  Ŀ¼�µĵ�����һ���и��������������
    //gulp.watch(['public/**']).on('change', function(file) {
    //    server.changed(file.path);
    //});
});

gulp.task('styles',function(){
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass({ style: 'expanded',includePaths: bourbon.includePaths}))
        .on('error', swallowError)
        .pipe(autoprefixer())
        //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/styles'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('public/styles'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/scripts'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .on('error', swallowError)
        .pipe(gulp.dest('public/scripts'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// ͼƬ
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .on('error', swallowError)
        .pipe(gulp.dest('public/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

// ����
gulp.task('clean', function() {
    return gulp.src(['public/styles', 'public/scripts', 'public/images'], {read: false})
        .pipe(clean());
});

// Ԥ������
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});


gulp.task('test', function () {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
        ,singleRun: true
    }, karmaExit);
});


function karmaExit(exitCode) {
    gutil.log('Karma has exited with ' + exitCode);
    //process.exit(exitCode);
}


function swallowError (error) {

    //If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}