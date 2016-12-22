(function () {
    'use strict';

    angular
        .module('components')
        .directive('tSpinner', tSpinner);

    /* @ngInject */
    function tSpinner() {
        return {
            bindToController: {
                step: '@',
                min: '@',
                value: '=',
                onChange: '&'
            },
            controller: SpinnerController,
            controllerAs: 'spinnerController',
            templateUrl: 'app/components/spinner/spinner.html',
            restrict: 'E',
            replace: true,
            scope: {}
        };

    }

    /* @ngInject */
    function SpinnerController() {
        var vm = this;

        vm.step = 1;
        vm.min = 0;
        vm.increment = increment;
        vm.decrement = decrement;

        ////////////////

        function increment() {
            vm.value += parseInt(vm.step);
            console.log(vm);
            vm.onChange({newValue: vm.value, oldValue: vm.value - vm.step});
        }

        function decrement() {
            if (vm.value - vm.step >= vm.min) {
                vm.value -= parseInt(vm.step);
                vm.onChange({newValue: vm.value, oldValue: vm.value + vm.step});
            }
        }
    }

})();