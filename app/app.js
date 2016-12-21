(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'ngCookies',
            'pascalprecht.translate',
            'main',
            'accounts',
            'eventbus',
            'authentication'
        ]);

})();