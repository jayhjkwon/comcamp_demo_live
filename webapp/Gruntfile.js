module.exports = function (grunt) {

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 8080,
          middleware: function (connect) {
            return [
              require('connect-livereload')({port: 35729}),
              connect.static(require('path').resolve('.'))
            ];
          }
        }
      }
    },

    watch: {
      options: {
        spawn: false,
        livereload: 35729
      },
      js: {
        tasks: ['concat:dev'],
        files: ['app.js', 'mocks.js', 'index.html']
      }
    },

     concat: {
      dev: {
        files: {
          'dist/app.min.js': 
          [
            'bower_components/jquery/jquery.js',
            'bower_components/handlebars/handlebars.js',
            'bower_components/ember/ember.js',
            'bower_components/jquery-mockjax/jquery.mockjax.js',
            'bower_components/markdown/lib/markdown.js',
            'mocks.js',
            'app.js'
          ]
        }
      }, 
      vs: {
        files: {
          'dist/app.min.js': 
          [
            'bower_components/jquery/jquery.js',
            'bower_components/handlebars/handlebars.js',
            'bower_components/ember/ember.js',
            'bower_components/jquery-mockjax/jquery.mockjax.js',
            'bower_components/markdown/lib/markdown.js',
            'app.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('vsbuild', ['concat:vs']);
  grunt.registerTask('server', ['concat:dev', 'connect', 'watch']);
};