(function () {
    'use strict';

    angular
        .module('authentication')
        .controller('AuthenticationController', AuthenticationController);

    AuthenticationController.$inject = ['$timeout', 'authenticationService'];

    /* @ngInject */
    function AuthenticationController($timeout, authenticationService) {
        var vm = this;

        vm.credentials = {
            login: 'Jan',
            password: '123'
        };
        vm.errors = {
            show: false
        };

        vm.login = login;

        ////////////////

        function login() {
            authenticationService.login(vm.credentials).catch(onLoginError);
        }

        function onLoginError() {
            vm.errors.show = true;
            $timeout(resetErrors, 3000);
        }

        function resetErrors() {
            vm.errors.show = false;
        }
    }

})();