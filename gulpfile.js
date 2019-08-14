const { dest, parallel, src, watch } = require('gulp');
const concat = require('gulp-concat');
const clean_css = require('gulp-clean-css');
const rename = require('gulp-rename');
const scss = require('gulp-sass');
const terser = require('gulp-terser');
const uglify = require('gulp-uglify');

const html_location = 'src/app/**/*.html';
const js_app_locations = [
    'src/app/app.js',
    'src/app/**/*.js',
];
const js_vendor_location = 'src/global_scripts/*.js';
const scss_locations = [
    'src/global_styles/*.scss',
    'src/app/**/*.scss',
];
function css_build() {
    const clean_css_options = {
        level: 2,
    };
    return src(scss_locations)
        .pipe(concat('style.scss'))
        .pipe(dest('_tmp/'))
        .pipe(scss())
        .pipe(dest('distribution/assets/styles/'))
        .pipe(clean_css(clean_css_options))
        .pipe(rename('style.min.css'))
        .pipe(dest('distribution/assets/styles/'));
}

function html_build() {
    return src(html_location)
        .pipe(rename((path) => {
            path.dirname = '';
        }))
        .pipe(dest('distribution/views/'));
}

function js_app_build() {
    return src(js_app_locations)
        .pipe(concat('app.js'))
        .pipe(dest('distribution/assets/scripts'))
        .pipe(uglify(
            // Required to keep AngularJS from throwing an error
            {mangle: false}
        ))
        .pipe(rename('app.min.js'))
        .pipe(dest('distribution/assets/scripts'));
}

function js_vendor_build() {
    return src(js_vendor_location)
        .pipe(concat('vendor.js'))
        .pipe(dest('distribution/assets/scripts'))
        .pipe(uglify())
        .pipe(rename('vendor.min.js'))
        .pipe(dest('distribution/assets/scripts'));
}

function serve() {
    scss_locations.forEach((location) => {
        watch(location, css_build);
    });
    watch(html_location, html_build);
    watch(js_app_locations, js_app_build);
    watch(js_vendor_location, js_vendor_build);
}

exports.serve = parallel(css_build, html_build, js_app_build, js_vendor_build, serve);