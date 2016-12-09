module.exports = function(grunt) {

   grunt.initConfig({
      bowercopy: {
         options: {
            srcPrefix: 'bower_components',
            runBower: true
         },
         scripts: {
            options: {
               destPrefix: 'public/script/lib'
            },
            files: {
                'jquery.js': 'jquery/dist/jquery.min.js',
                'vue.js': 'vue/dist/vue.min.js',
                'bootstrap.js': 'bootstrap/dist/js/bootstrap.min.js',
                'mnemonic.js': 'mnemonic.js/mnemonic.js',
                'tether.js': 'tether/dist/js/tether.min.js',
            },
         },
         style: {
            options: {
               destPrefix: 'public/css/lib'
            },
            files: {
                'bootstrap.css': 'bootstrap/dist/css/bootstrap.min.css',
                'tether.css': 'tether/dist/css/tether.min.css'
            },
         },
         node: {
             options: {
                 srcPrefix: 'node_modules',
                 destPrefix: 'public/script/lib'
             },
             files: {
                 'wordlists': 'bip39/wordlists',
                 'bip39.js': 'bip39/index.js'
             }
         },
      },   
   });

   grunt.loadNpmTasks('grunt-bowercopy');
};
