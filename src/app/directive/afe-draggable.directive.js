(function() {

    angular.module('angular-form-editor')
        .directive('afeDraggable', Directive);

    function Directive() {
        return {
            restrict: 'A'
        }
    }

})();