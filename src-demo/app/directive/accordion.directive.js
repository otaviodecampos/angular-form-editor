(function() {

    angular.module('demo')
        .directive('uiAccordion', Directive);

    function Directive($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var settings = $parse(attrs.uiAccordion)(scope);
                element.accordion(settings);
            }
        }
    }

})();