(function () {
    'use strict';

    angular
        .module('components')
        .directive('tGrid', tGrid);

    /* @ngInject */
    function tGrid() {
        return {
            bindToController: {
                provider: '=',
                fetchMethod: '@',
                model: '=',
                api: '='
            },
            controller: GridController,
            controllerAs: 'gridController',
            templateUrl: 'app/components/grid/grid.html',
            restrict: 'E',
            link: link,
            scope: {}
        };
    }

    function link($scope, element, attrs, controller) {
        controller.refresh();
        controller.api.refresh = controller.refresh;
    }

    GridController.$inject = ['$scope'];

    /* @ngInject */
    function GridController($scope) {
        var vm = this;

        vm.onPreviousPage = onPreviousPage;
        vm.onNextPage = onNextPage;
        vm.refresh = refresh;

        vm.page = {
            hasPrevious: false,
            hasNext: false,
            pageNumber: 0,
            totalPages: 0,
            accounts: []
        };

        ////////////////

        function refresh() {
            vm.provider[vm.fetchMethod](vm.page.pageNumber).then(function (page) {
                vm.page = page;
            });
        }

        function onPreviousPage() {
            vm.page.pageNumber--;
            refresh();
        }

        function onNextPage() {
            vm.page.pageNumber++;
            refresh();
        }

    }

})();

