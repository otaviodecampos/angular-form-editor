(function() {

    angular.module('angular-form-editor')
        .directive('afeComponentHover', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'angular-form-editor/afe-component-hover.tpl.html',
            replace: true
        }
    }

})();