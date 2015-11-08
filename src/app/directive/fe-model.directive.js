(function () {

    angular.module('angular-form-editor')
        .directive('feModel', Directive);

    function Directive($compile, $timeout) {
        return {
            restrict: 'A',
            require: '?^feCanvas',
            link: function (scope, element, attrs, feCanvas) {

                if(!feCanvas) return;

                var timeout
                    , pathValidator = /^\w+\.?\w+$/g;

                element.removeAttr('fe-model');

                scope.$watch(attrs.feModel, function (feModel) {

                    $timeout.cancel(timeout);
                    timeout = $timeout(function () {

                        if (!feModel || !feModel.match(pathValidator)) {
                            element.removeAttr('ng-model');
                        } else {
                            scope.model = feCanvas.model;
                            element.attr('ng-model', 'model.' + feModel);
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