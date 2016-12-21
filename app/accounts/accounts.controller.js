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
        vm.page = {
            hasPrevious: false,
            hasNext: false,
            pageNumber: 0,
            totalPages: 0,
            accounts: []
        };

        vm.createAccount = createAccount;
        vm.showPreviousPage = showPreviousPage;
        vm.showNextPage = showNextPage;

        activate();

        ////////////////

        function activate() {
            refresh();
        }

        function refresh() {
            accountsService.getAccounts(vm.page.pageNumber).then(function (page) {
                vm.page = page;
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

        function showPreviousPage() {
            vm.page.pageNumber--;
            refresh();
        }

        function showNextPage() {
            vm.page.pageNumber++;
            refresh();
        }

    }

})();