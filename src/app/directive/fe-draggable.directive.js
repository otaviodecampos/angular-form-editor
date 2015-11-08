(function() {

    angular.module('angular-form-editor')
        .directive('feDraggable', Directive);

    function Directive() {
        return {
            restrict: 'A'
        }
    }

})();