(function () {
    'use strict';

    angular.module('accounts')
        .service('accountsService', accountsService);

    accountsService.$inject = ['$http', '$q'];

    /* @ngInject */
    function accountsService($http, $q) {
        var service = this,
            accountsUrl = 'http://localhost:8080/api/accounts',
            operationsUrl = 'http://localhost:8080/api/operations';

        service.createAccount = createAccount;
        service.getAccounts = getAccounts;
        service.process = process;

        ////////////////

        function createAccount() {
            return $http({
                url: accountsUrl,
                method: 'POST'
            });
        }

        function getAccounts(pageNumber, pageSize) {
            return $http({
                url: accountsUrl,
                params: {
                    pageNumber: pageNumber,
                    pageSize: pageSize
                }
            }).then(onGetAccountsResponse);
        }

        function onGetAccountsResponse(response) {
            var data = response.data;
            return $q.resolve({
                accounts: data.accounts,
                pageNumber: data.pageNumber,
                totalPages: data.totalPages,
                hasNext: data.pageNumber < data.totalPages - 1,
                hasPrevious: data.pageNumber > 0
            });
        }

        function process(operation) {
            return $http({
                url: operationsUrl,
                method: 'POST',
                data: operation
            });
        }
    }

})();