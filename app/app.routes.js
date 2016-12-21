(function () {
    'use strict';

    angular
        .module('app').config(config);

    config.$inject = ['$routeProvider'];

    /* @ngInject */
    function config($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'app/authentication/loginForm.html',
            controller: 'AuthenticationController',
            controllerAs: 'authenticationController'
        });
        $routeProvider.when('/manage-accounts', {
            templateUrl: 'app/accounts/accounts.html',
            controller: 'AccountsController',
            controllerAs: 'accountsController'
        });
    }

})();