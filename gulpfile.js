///////////////////////////////////////////////////////////////
// Required Modules 
///////////////////////////////////////////////////////////////
var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    watch       = require('gulp-watch'),
    inject      = require('gulp-inject'),
    rename      = require("gulp-rename"),
    flatten     = require('gulp-flatten'),
    del         = require('del'),
    minifycss   = require('gulp-minify-css'),
    mainBowerFiles = require('main-bower-files'),
    gulpFilter  = require('gulp-filter'),
    series = require('stream-series'),
    browserSync = require('browser-sync').create();
///////////////////////////////////////////////////////////////
// End of Modules 
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
// Variables
///////////////////////////////////////////////////////////////

var dist        = 'public/dist/',
    views       = 'public/views/',
    source      = 'source/',
    b_components= 'bower_components/';


///////////////////////////////////////////////////////////////
// End variables
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
// Tasks
///////////////////////////////////////////////////////////////

// get bower components js files
gulp.task('bower-components-js', function() {

    return gulp.src(mainBowerFiles())
    .pipe(gulpFilter('*.js'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(dist + 'js'))

});

// get bower components css files
gulp.task('bower-components-css', function() {

    gulp.src([
        b_components + '**/dist/**/*.css',
        '!'+b_components + '**/dist/**/*.min.css'
    ])
    .pipe(flatten())
    .pipe(minifycss())
    .pipe(gulp.dest(dist + "styles"));
});

// get bower components fonts
gulp.task('bower-components-font', function() {

    gulp.src([
        b_components + '**/*.eot', 
        b_components + '**/*.woff', 
        b_components + '**/*.svg', 
        b_components + '**/*.ttf'
    ])
    // dont copy nested folder just their files
    .pipe(flatten())
    // minify file
    .pipe(gulp.dest(dist+"fonts"));
});

// task to compile all the scss to css
gulp.task('sass_compiler',function(){
    gulp.src([
        source + '**/*.scss'
    ])
    .pipe(flatten())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifycss())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(dist + "styles"));
});

// task to compile all the js
gulp.task('js_compiler', function(){
    gulp.src([
        source + '**/*.js', 
        '!'+ source + '**/*.min.js',
        '!'+ source + 'app/**/*.js'
    ])
    // dont copy nested folder just their files
    .pipe(flatten())
    // minify file
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    // save files at 'public/dist/js' as name.min.js
    .pipe(gulp.dest(dist+"js"));
});

// task to compile angular app
gulp.task('angular_app', function(){
    gulp.src(source + 'app/**/*.js')
     // minify file
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    // save files at 'public/dist/app' as name.min.js
    .pipe(gulp.dest(dist+"app"));
});

// inject files to index.html
gulp.task('inject', function () {
    var target = gulp.src(views + 'index.html');
    var sources = gulp.src(
        [
            dist+'**/!(underscore.min|jquery.min)*.js', 
            '!'+dist+'/app/**/*.js',
            dist+'**/*.css'

        ], 
        {read: false}
    ),
    underscore  = gulp.src(dist+'js/underscore.min.js',{read: false}),
    jquery      = gulp.src(dist+'js/jquery.min.js',{read: false}),
    app         = gulp.src(dist+'/app/app.js',{read: false});

    return  target.pipe(inject(series(jquery, underscore, sources, app)))
            .pipe(gulp.dest(views));
});

// task to clean
gulp.task('clean', function(){
    del([dist]);
});

///////////////////////////////////////////////////////////////
// Task runner
///////////////////////////////////////////////////////////////

// run all bower task
gulp.task('bower', ['bower-components-css', 'bower-components-font', 'bower-components-js']);

// compile all source task
gulp.task('compile', ['js_compiler', 'sass_compiler','angular_app']);


///////////////////////////////////////////////////////////////
// Watch changes
///////////////////////////////////////////////////////////////
gulp.task('watch', function(){
    // watch for changes on any file from source folder 
    // and executet all te tasks from the array
    gulp.watch(source + '**/*', ['compile','inject']);
});

///////////////////////////////////////////////////////////////
// Default Task
///////////////////////////////////////////////////////////////
gulp.task('default', ['compile','bower']);
gulp.task('dev', ['default','watch']);

