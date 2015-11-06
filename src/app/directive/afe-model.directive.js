(function () {

    angular.module('angular-form-editor')
        .directive('afeModel', Directive);

    function Directive($compile, $timeout) {
        return {
            restrict: 'A',
            require: '?^afeCanvas',
            link: function (scope, element, attrs, afeCanvas) {

                if(!afeCanvas) return;

                var timeout
                    , pathValidator = /^\w+\.?\w+$/g;

                element.removeAttr('afe-model');

                scope.$watch(attrs.afeModel, function (afeModel) {

                    $timeout.cancel(timeout);
                    timeout = $timeout(function () {

                        if (!afeModel || !afeModel.match(pathValidator)) {
                            element.removeAttr('ng-model');
                        } else {
                            scope.model = afeCanvas.model;
                            element.attr('ng-model', 'model.' + afeModel);
                        }

                        // Unbind all previous event handlers, this is necessary to remove previously linked models.
                        element.unbind();
                        element = $compile(element)(scope);

                    }, 100);
                });
            }
        }
    }

})();