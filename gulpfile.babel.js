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

// fetch command line arguments
const arg = (argList => {

    let arg = {}, a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {

        thisOpt = argList[a].trim();
        opt = thisOpt.replace(/^\-+/, '');

        if (opt === thisOpt) {

            // argument value
            if (curOpt) arg[curOpt] = opt;
            curOpt = null;
        }
        else {

            // argument name
            curOpt = opt;
            arg[curOpt] = true;
        }
    }
    return arg;

})(process.argv);

let page = arg.page || 1;

/**
 * @command gulp css --page [int]
 */
gulp.task('css', () => {
	return gulp.src([
        `./pages/page${page}/scss/**/*.scss`,
    ])
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ["> 0%"]
		}))
		.pipe(gulp.dest(`./pages/page${page}/css`))
		.pipe(cssmin())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(`./pages/page${page}/css`));
});

/**
 * @command gulp js --page [int]
 */
gulp.task('js', () => {
	return gulp.src([
        './components/bootstrap-sass/assets/javascripts/bootstrap.js',
        './components/bootstrap-select/js/bootstrap-select.js',
		`./pages/page${page}/js/scripts.js`,
	])
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(concat('bundle.js'))
		// .pipe(uglify())
		.pipe(gulp.dest(`./pages/page${page}/js`));
});

/**
 * @command gulp fonts --page [int]
 */
gulp.task('fonts', function() {
    return gulp.src([
        './components/font-awesome/fonts/fontawesome-webfont.*'])
        .pipe(gulp.dest(`./pages/page${page}/fonts`));
});

/**
 * @command gulp serve --page [int]
 */
gulp.task('serve', function() {

    bs.init({
        server: `./pages/page${page}`
    });
    gulp.watch(`./pages/page${page}/*.html`).on('change', bs.reload);
});

/**
 * @command gulp watch --page [int]
 */
gulp.task('watch', ['serve'], () => {
	gulp.watch([`./pages/page${page}/scss/**/*.scss`, `./pages/page${page}/js/**/*.js`], [`css`, `js`, `fonts`])
});