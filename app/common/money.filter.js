(function () {
    'use strict';

    angular
        .module('common')
        .filter('money', money);

    function money() {
        return moneyFilter;

        ////////////////

        function moneyFilter(value) {
            var language = window.navigator.userLanguage || window.navigator.language,
                result = (parseFloat(value) / 100).toFixed(2),
                suffix = language.indexOf('pl') !== -1 ? 'PLN' : 'USD';
            return result + ' ' + suffix;
        }
    }

})();