const gulp = require("gulp");
const sass = require("gulp-sass");
// const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

gulp.task("serve", ["sass"], function() {
	browserSync.init({
		server: "./"
	});

	gulp.watch("sass/*.scss", ["sass"]);
	gulp.watch("*.html").on("change", browserSync.reload);
});

gulp.task("sass", function() {
	return gulp
		.src("sass/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("./css"));
});
//
// gulp.task("prefix", function() {
// 	return gulp
// 		.src("./css")
// 		.pipe(
// 			autoprefixer({
// 				browsers: ["last 2 versions"],
// 				cascade: false
// 			})
// 		)
// 		.pipe(gulp.dest("./"));
// });
gulp.task("sass", function() {
	return gulp
		.src("./sass/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("./css"))
		.pipe(browserSync.stream());
});

gulp.task("default", ["serve"]);
