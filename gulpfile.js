
const gulp        = require('gulp');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const webpack = require("webpack-stream");
const concat = require('gulp-concat');
const babel = require('gulp-babel')
gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("(src/*.html)").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/**/*.js", gulp.parallel('build-js'));
    gulp.watch("src/*.html", gulp.parallel('html'));
});

gulp.task('html', function(){
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true}))
        .pipe(gulp.dest("dist/"));
});


gulp.task('fonts', function(){
    return gulp.src("src/fonts/**/*.*")
        
        .pipe(gulp.dest("dist/fonts"));
});
gulp.task('icons', function(){
    return gulp.src("src/icons/**/*.*")
        .pipe(gulp.dest("dist/icons"));
});
gulp.task('mailer', function(){
    return gulp.src("src/mailer/**/*.*")
        .pipe(gulp.dest("dist/mailer"));
});
gulp.task('images', function(){
    return gulp.src("src/img/**/*.*")
        //.pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});
gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
    .pipe(babel())
    .pipe(webpack({
        mode: 'development'
    }))
                .pipe(gulp.dest("dist/js/"))
                .on("end", browserSync.reload);
});
gulp.task('default', gulp.parallel('watch', 'server', 'styles','images','mailer','icons','fonts','build-js','html'));