const project_folder = 'datahata';
const source_folder = "#src";
const fs = require('fs');

const path = {
    build: {
        html:project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },

    src: {
        html:[source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf",
    },

    watch: {
        html:source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
    },

    clean: "./" + project_folder + "/" 
}

const {src, dest} = require('gulp');
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const del = require('del');
const scss= require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const group_media = require('gulp-group-css-media-queries');
const clean_css = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const webpCss = require('gulp-webp-css');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
    return gulp.src('./datahata/**/*')
        .pipe(ghPages());
});

function browserSync(){
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/" 
        },
        port: 3000,
        notify: false
    })
}

function html(){
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(webpHTML())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream()); 
}

function css(){
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(group_media())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(webpCss())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        ) 
       
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream()); 
}


function js(){
    return src(path.src.js)
        .pipe(fileInclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        ) 
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream()); 
}

function images(){
    return src(path.src.img)
       
        .pipe(webp({
            quality: 70
        }))
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
            progressive: true,
            svgPlugins: [{
                removeViewBox: false
            }],
            interlaced: true,
            optimizationLevel: 3
        }))

        .pipe(dest(path.build.img))
        .pipe(browsersync.stream()); 
}

function fonts(){
    src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts))

    return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))

}

function fontsStyle(){
    let file_content = fs.readFileSync(source_folder + '/scss/base/fonts.scss');
    if (file_content === '') {
        fs.writeFile(source_folder + '/scss/base/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname !== fontname) {
                        fs.appendFile(source_folder + '/scss/base/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}



function watchFiles(){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);  
    gulp.watch([path.watch.js], js); 
    gulp.watch([path.watch.img], images); 
}

function clean(){
    return del(path.clean);
}


let build = gulp.series(clean,gulp.parallel(js,css,html,images,fonts), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js; 
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;


