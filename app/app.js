(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'main',
            'common',
            'accounts',
            'eventbus',
            'authentication'
        ]);

})();