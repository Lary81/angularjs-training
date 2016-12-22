(function () {
    'use strict';

    angular.module('common')
        .filter('reverse', reverse);

    function reverse() {
        return reverseFilter;

        ////////////////

        function reverseFilter(text) {
            return text.split('').reverse().join('');
        }
    }

})();