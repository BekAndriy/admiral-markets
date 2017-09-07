import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import cssmin from 'gulp-cssmin';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import autoprefixer from "gulp-autoprefixer";

gulp.task('css:page', () => {
    return gulp.src('./pages/page1/scss/styles.scss')
        .pipe(sass())
		.pipe(autoprefixer({
			browsers: ["> 0%"]
		}))
		.pipe(gulp.dest('./pages/page1/css'));
});

gulp.task('js:page', () => {
	return gulp.src([
		    './pages/page1/js/scripts.js',
        ])
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(concat('bundle.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./pages/page1/js'));
});

gulp.task('prcss:watcher', () => {
	gulp.watch(['./pages/page1/scss/**/*.scss', './pages/page1/js/**/*.js'],['css:page', 'js:page'])
});