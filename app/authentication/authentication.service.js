(function () {
    'use strict';

    angular
        .module('authentication')
        .service('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', '$httpParamSerializer', '$q', 'busService'];

    /* @ngInject */
    function authenticationService($http, $httpParamSerializer, $q, busService) {
        var service = this;

        service.login = login;
        service.logout = removeAuthorizationToken;

        ////////////////

        function login(credentials) {
            var data = {
                username: credentials.login,
                password: credentials.password,
                grant_type: 'password',
                client_id: 'rest'
            };

            function onLoginResponse(response) {
                var token = response.data.access_token;
                return $q(function (resolve, reject) {
                    if (token) {
                        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                        busService.publish('has-authenticated');
                        resolve();
                    } else {
                        reject();
                    }
                });
            }

            removeAuthorizationToken();

            return $http({
                url: 'http://localhost:8080/oauth/token',
                method: 'POST',
                data: $httpParamSerializer(data),
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }).then(onLoginResponse);
        }

        function removeAuthorizationToken() {
            delete $http.defaults.headers.common.Authorization;
        }

    }

})();