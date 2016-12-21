(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'ngCookies',
            'pascalprecht.translate',
            'main',
            'common',
            'accounts',
            'eventbus',
            'authentication'
        ]);

})();