(function() {

    angular.module('angular-form-editor')
        .directive('feProperties', Directive);

    function Directive($compile, $document) {
        return {
            restrict: 'EA',
            require: '^feCanvas',
            scope: {},
            link: function(scope, element, attrs, canvasCtrl) {
                element.removeAttr('fe-properties');
                element.attr('ng-style', '{left: canvas.propertiesX + "px", top: canvas.propertiesY + "px"}');
                element.attr('ng-class', '{show: canvas.showProperties}');
                scope.canvas = canvasCtrl;
                $compile(element)(scope);
            }
        }
    }

})();