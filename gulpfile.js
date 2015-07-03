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
    nodemon = require('gulp-nodemon'),
    bourbon = require('node-bourbon'),
    karma = require('karma').server;


gulp.task('run', ['nodemon'], function () {
    livereload.listen({basePath: 'assert'});
    gulp.watch('source/styles/**/*.scss', ['styles']);
    gulp.watch('source/scripts/**/*.js', ['scripts']);
});
gulp.task('reload', function () {
    gulp.pipe(livereload());
});

gulp.task('styles',function(){
    return gulp.src('source/styles/**/*.scss')
        .pipe(sass({ style: 'expanded',includePaths: bourbon.includePaths}))
        .on('error', swallowError)
        .pipe(autoprefixer())
        //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('tmp/styles'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('assets/styles'))
        .pipe(notify({ message: 'Styles task complete' }))
        .pipe(livereload());
});

gulp.task('scripts', function() {
    return gulp.src('source/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('tmp/scripts'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .on('error', swallowError)
        .pipe(gulp.dest('assets/scripts'))
        .pipe(notify({ message: 'Scripts task complete' }))
        .pipe(livereload());
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'app.js',
        ext: 'html js',
        ignore: ['source/**/*.*','tmp/**/*.*'],
        tasks: ['reload']
    })
        .on('restart', function () {
            console.log('restarted!');
        })
})



//
//// 图片
//gulp.task('images', function() {
//    return gulp.src('src/images/**/*')
//        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
//        .on('error', swallowError)
//        .pipe(gulp.dest('public/images'))
//        .pipe(notify({ message: 'Images task complete' }));
//});
//
//// 清理
//gulp.task('clean', function() {
//    return gulp.src(['public/styles', 'public/scripts', 'public/images'], {read: false})
//        .pipe(clean());
//});
//
//// 预设任务
//gulp.task('default', ['clean'], function() {
//    gulp.start('styles', 'scripts', 'images');
//});
//
//
//gulp.task('test', function () {
//    karma.start({
//        configFile: __dirname + '/karma.conf.js'
//        ,singleRun: true
//    }, karmaExit);
//});
//
//
//function karmaExit(exitCode) {
//    gutil.log('Karma has exited with ' + exitCode);
//    //process.exit(exitCode);
//}
//

function swallowError(error) {

    //If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}