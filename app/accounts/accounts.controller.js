(function () {
    'use strict';

    angular.module('accounts')
        .controller('AccountsController', AccountsController);

    AccountsController.$inject = ['$timeout', 'accountsService' ];

    /* @ngInject */
    function AccountsController($timeout, accountsService) {
        var vm = this;

        vm.operation = {
            status: ''
        };
        vm.accounts = [];

        vm.createAccount = createAccount;

        activate();

        ////////////////

        function activate() {
            refresh();
        }

        function refresh() {
            accountsService.getAccounts().then(function (accounts) {
                vm.accounts = accounts;
            });
        }

        function createAccount() {
            accountsService.createAccount().then(onCreateAccountSuccess, onCreateAccountError).finally(onCreateAccountComplete);
        }

        function onCreateAccountSuccess() {
            vm.operation.status = 'success';
            refresh();
        }

        function onCreateAccountError() {
            vm.operation.status = 'failure';
        }

        function onCreateAccountComplete() {
            $timeout(resetStatus, 3000);
        }

        function resetStatus() {
            vm.operation.status = '';
        }

    }

})();