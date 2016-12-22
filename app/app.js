(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'ngCookies',
            'ngMessages',
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