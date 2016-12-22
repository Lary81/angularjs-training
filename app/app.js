(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'components',
            'main',
            'common',
            'accounts',
            'eventbus',
            'authentication'
        ]);

})();