import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import cssmin from 'gulp-cssmin';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import autoprefixer from "gulp-autoprefixer";
import browserSync from "browser-sync";
var bs = browserSync.create();


gulp.task('css:page', () => {
	return gulp.src('./pages/page1/scss/**/*.scss')
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
	gulp.watch(['./pages/page1/scss/**/*.scss', './pages/page1/js/**/*.js'], ['css:page', 'js:page'])
});

gulp.task('css:page2', () => {
	return gulp.src('./pages/page2/scss/**/*.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ["> 0%"]
		}))
		.pipe(gulp.dest('./pages/page2/css'))
		.pipe(cssmin())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./pages/page2/css'));
});

gulp.task('js:page2', () => {
	return gulp.src([
		'./pages/page2/js/scripts.js',
	])
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(concat('bundle.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('./pages/page2/js'));
});


gulp.task('serve', function() {

    bs.init({
        server: "./pages/page2"
    });

    gulp.watch("./pages/page2/*.html").on('change', bs.reload);
});

gulp.task('prcss:watcher2', ['serve'], () => {
	gulp.watch(['./pages/page2/scss/**/*.scss', './pages/page2/js/**/*.js'], ['css:page2', 'js:page2'])
});