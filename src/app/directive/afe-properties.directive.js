(function() {

    angular.module('angular-form-editor')
        .directive('afeProperties', Directive);

    function Directive($compile) {
        return {
            restrict: 'EA',
            require: '^afeCanvas',
            scope: {},
            link: function(scope, element, attrs, canvasCtrl) {
                scope.canvas = canvasCtrl;
                element.removeAttr('afe-properties');
                element.attr('ng-style', '{left: canvas.propertiesX + "px", top: canvas.propertiesY + "px"}');
                element.attr('ng-class', '{show: canvas.showProperties}');
                $compile(element)(scope)
            }
        }
    }

})();