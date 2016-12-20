(function () {
    'use strict';

    angular
        .module('app').config(config);

    config.$inject = ['$translateProvider'];

    /* @ngInject */
    function config($translateProvider) {
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.useLocalStorage(true);
        $translateProvider.preferredLanguage('pl');
        $translateProvider.useStaticFilesLoader({
            prefix: 'assets/lang/',
            suffix: '.json'
        });
    }

})();