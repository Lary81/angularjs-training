module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'bower_components/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/**/*.module.js',
      'app/**/*.service.js',
      'app/**/*.controller.js',
      'app/**/*.directive.js',
      'app/**/*.filter.js',
      'app/**/*.spec.js'
    ],

    exclude: [
    ],

    preprocessors: {
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
};
