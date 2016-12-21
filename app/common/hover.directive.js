(function () {
    'use strict';

    angular
        .module('common')
        .directive('tHover', tHover);

    /* @ngInject */
    function tHover() {
        var directive = {
            link: link,
            restrict: 'A'
        };

        function link(scope, element, attrs) {
            var cls = 'hover';
            element.mouseover(function () {
                element.addClass(cls);
            });
            element.mouseleave(function () {
                element.removeClass(cls);
            });
        }

        return directive;
    }

})();

