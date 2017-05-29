const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const browserify = require("browserify");
const watchify = require("watchify");
const babel = require("babelify");
const uglify = require("gulp-uglify");

function compile(watch) {
  const bundler = watchify(
    browserify("./src/main.js", {
      debug: true
    })
    .transform(babel)
  );

  function rebundle() {
    bundler
      .bundle()
      .on("error", function(err) {
        console.error("Bundling Error: \n" + err);
        this.emit("end");
      })
      .pipe(source("main.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(uglify())
      .on("error", (err) => {
        console.error("Uglify Error:\n" + err);
        this.emit('end');
      })
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("./docs"));
  }

  if (watch) {
    bundler.on("update", function() {
      console.log("-> bundling...");
      rebundle();
    });
  }

  rebundle();
}

gulp.task("build", function() {
  return compile();
});

gulp.task("watch", function() {
  return compile(true);
});

gulp.task("default", ["watch"]);
