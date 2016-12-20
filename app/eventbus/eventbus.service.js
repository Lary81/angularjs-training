(function () {
    'use strict';

    angular
        .module('eventbus')
        .service('busService', busService);

    busService.$inject = ['$rootScope'];

    /* @ngInject */
    function busService($rootScope) {
        var service = this;

        service.publish = publish;
        service.on = on;

        ////////////////

        function publish(event, data) {
            $rootScope.$broadcast(event, data);
        }

        function on(event, callback) {
            $rootScope.$on(event, callback);
        }

    }

})();

