/**
 * Gruntfile.
 * @type {[type]}
 */
module.exports = function(grunt) {

  /**
   * [sass description]
   * @type {[type]}
   */
  const sass = require('node-sass');

  /**
   * [pkg description]
   * @type {[type]}
   */
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        implementation: sass,
        includePaths: [
        ],
        lineNumbers: true,
        sourceMap: true,
        outputStyle: 'nested',
        precision: 10
      },
      dist: {
        files: {
          'css/sass-demo.css':  'scss/sass-demo.scss',
        }
      }
    },
    sasslint: {
      options: {
        configFile: '.sass-lint.yml'
      },
      target: ['core/scss/\*\*/\*.scss']
    },
    postcss: {
      options: {
        map: true, // inline sourcemaps
        processors: [
          require('autoprefixer')({ grid: true, browsers: ['last 2 versions', 'ie 11']}) // add vendor prefixes
        ]
      },
      dist: {
        src: [
          'core/css/*.css'
        ]
      }
    },
    watch: {
      css: {
        files: ['**/*.scss'],
        tasks: ['styleguide'],
        options: {
          livereload: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sass-lint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-deploy-site');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('compile', ['sass:dist', 'postcss:dist']);
  grunt.registerTask('default', ['watch']);

}
