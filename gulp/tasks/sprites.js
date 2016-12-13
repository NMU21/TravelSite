var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

var config = {
	mode: {
		css: {
			sprite: 'sprite.svg',
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
	
}

gulp.task('beginClean', function() {
	return del(['./app/temp/sprite', './app/assets/images/sprites']);
	
});

gulp.task('createSprite', ['beginClean'] , function() {
	return gulp.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./app/temp/sprite/'));
	
});

gulp.task('copySpriteGraphics', ['createSprite'], function() {
	return gulp.src('./app/temp/sprite/css/**/*.svg')
		.pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'] , function() {
	return gulp.src('./app/temp/sprite/css/*.css')
		.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./app/assets/styles/modules'));
	
});

gulp.task('endClean', ['copySpriteGraphics', 'copySpriteCSS'], function () {
	return del('./app/temp/sprite');
});

// make the 2 tasks run after eachother, first create, then copysprite
gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphics', 'copySpriteCSS', 'endClean']);


