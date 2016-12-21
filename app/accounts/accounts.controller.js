(function () {
    'use strict';

    angular.module('accounts')
        .controller('AccountsController', AccountsController);

    AccountsController.$inject = ['$timeout', '$uibModal', 'accountsService'];

    /* @ngInject */
    function AccountsController($timeout, $uibModal, accountsService) {
        var vm = this,
            sortBy = {
                order: 1,
                column: 'number'
            };

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
        vm.sort = sort;
        vm.showOperationModal = showOperationModal;

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
            accountsService.createAccount().then(onCreateAccountSuccess, onCreateAccountError)
                .finally(onCreateAccountComplete);
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

        function sort(column) {
            sortBy.order = sortBy.column === column ? sortBy.order *= -1 : 1;
            sortBy.column = column;
            vm.page.accounts.sort(comparator);
        }

        function comparator(account, otherAccount) {
            if (account[sortBy.column] > otherAccount[sortBy.column]) {
                return sortBy.order;
            }
            if (account[sortBy.column] < otherAccount[sortBy.column]) {
                return -1 * sortBy.order;
            }
            return 0;
        }

        function showOperationModal(account) {
            function OperationController($uibModalInstance) {
                var vm = this;

                vm.operation = {
                    sourceAccountNumber: account.number,
                    funds: 0,
                    name: 'depositOperation',
                    types: ['depositOperation', 'withdrawOperation']
                };

                vm.ok = ok;
                vm.cancel = close;

                ////////////////

                function ok() {
                    close();
                    vm.operation.funds *= 100;
                    accountsService.process(vm.operation).then(refresh);
                }

                function close() {
                    $uibModalInstance.close();
                }
            }

            OperationController.$inject = ['$uibModalInstance'];

            $uibModal.open({
                templateUrl: 'operation-template',
                controller: OperationController,
                controllerAs: 'operationController'
            });
        }
        
    }

})();