var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var inject = require('gulp-inject');

var buildDir = 'build';

var css = [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/bootstrap/dist/css/bootstrap-theme.css',
    'assets/css/*.css'
];

var scripts = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-messages/angular-messages.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-cookies/angular-cookies.js',
    'bower_components/angular-translate/angular-translate.js',
    'bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
    'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
    'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
    'app/app.js',
    'app/app.config.js',
    'app/app.routes.js',
    'app/**/*.module.js',
    'app/**/*.service.js',
    'app/**/*.controller.js',
    'app/**/*.directive.js',
    'app/**/*.filter.js'
];

gulp.task('clean', function () {
   return del(buildDir); 
});

gulp.task('css', function () {
   return gulp.src(css)
       .pipe(concat('style.css'))
       .pipe(minifyCss({compatibility: 'ie8'}))
       .pipe(gulp.dest(buildDir + '/assets/css'));
});

gulp.task('scripts', function () {
    return gulp.src(scripts)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildDir + '/app'));
});

gulp.task('resources', function () {
    gulp.src('app/**/*.html').pipe(gulp.dest(buildDir + '/app'));
    return gulp.src('assets/lang/**').pipe(gulp.dest(buildDir + '/assets/lang'));
});

gulp.task('inject', function () {
    var src = gulp.src(scripts.concat(css), {read: false});
    return gulp.src('index_base.html')
        .pipe(rename('index.html'))
        .pipe(inject(src, {addRootSlash: false}))
        .pipe(gulp.dest('.'));
});

gulp.task('build', ['css', 'scripts', 'resources'], function () {
    var src = gulp.src(['app/app.js', 'assets/css/style.css'], {read: false});
    return gulp.src('index_base.html')
        .pipe(rename('index.html'))
        .pipe(inject(src, {addRootSlash: false}))
        .pipe(gulp.dest(buildDir));
});