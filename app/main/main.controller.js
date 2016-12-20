(function () {
    'use strict';

    angular
        .module('main')
        .controller('MainController', MainController);

    MainController.$inject = ['$translate', '$location', 'busService', 'authenticationService'];

    /* @ngInject */
    function MainController($translate, $location, busService, authenticationService) {
        var vm = this;

        vm.security = {
            isAuthenticated: false
        };

        vm.setLanguage = setLanguage;
        vm.logout = logout;

        activate();

        ////////////////

        function activate() {
            busService.on('has-authenticated', onHasAuthenticated);
            if (!vm.security.isAuthenticated) {
                $location.path('/login');
            }
        }

        function onHasAuthenticated() {
            vm.security.isAuthenticated = true;
            $location.path('/');
        }

        function setLanguage(language) {
            $translate.use(language);
        }

        function logout() {
            vm.security.isAuthenticated = false;
            $location.path('/login');
        }

    }

})();