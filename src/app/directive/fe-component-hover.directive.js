(function() {

    angular.module('angular-form-editor')
        .directive('feComponentHover', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'angular-form-editor/fe-component-hover.tpl.html',
            replace: true
        }
    }

})();