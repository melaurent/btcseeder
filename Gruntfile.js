module.exports = function(grunt) {

   grunt.initConfig({
      bowercopy: {
         options: {
            srcPrefix: 'bower_components' 
         },
         scripts: {
            options: {
               destPrefix: 'public/script/lib'
            },
            files: {
                'jquery.js': 'jquery/dist/jquery.min.js',
                'vue.js': 'vue/dist/vue.min.js',
                'bootstrap.js': 'bootstrap/dist/js/bootstrap.min.js',
                'mnemonic.js': 'mnemonic.js/mnemonic.js'
            },
         },
         style: {
            options: {
               destPrefix: 'public/css/lib'
            },
            files: {
                'bootstrap.css': 'bootstrap/dist/css/bootstrap.min.css'
            },
         },
      },   
   });

   grunt.loadNpmTasks('grunt-bowercopy');
};
