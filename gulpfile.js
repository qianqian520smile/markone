var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var server = require('gulp-webserver');

var babel = require('gulp-babel');

//编译scss
gulp.task('sass', function() {
    return gulp.src('src/scss/index.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css/'))
});

gulp.task('watch', function() {
    gulp.watch('src/scss/index.scss', gulp.series('sass'));
});

gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,

        }));
});

gulp.task('dev', gulp.parallel('watch', 'webserver'));

gulp.task('uglify', function() {
    return gulp.src('src/scripts/index.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
});

gulp.task('csses', function() {
    return gulp.src('src/css/index.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css/'))
});


gulp.task('build', gulp.parallel('uglify', 'csses'));