(function () {
    'use strict';

    angular.module('accounts')
        .service('accountsService', accountsService);

    accountsService.$inject = ['$http', '$q'];

    /* @ngInject */
    function accountsService($http, $q) {
        var service = this,
            accountsUrl = 'http://localhost:8080/api/accounts';

        service.createAccount = createAccount;
        service.getAccounts = getAccounts;

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
            return $q.resolve(response.data.accounts);
        }

    }

})();