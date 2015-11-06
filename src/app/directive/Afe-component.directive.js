(function () {

    angular.module('angular-form-editor')
        .directive('afeComponent', Directive);

    function Directive($http, $templateCache, $compile, $controller, AfeLibrary, FORM_COMPONENT) {
        return {
            restrict: 'E',
            transclude: 'element',
            require: '^afeComponentList',
            controller: 'AfeComponentCtrl as componentCtrl',
            compile: function() {
                return {
                    post: function (scope, element, attrs, afeComponentListCtrl) {

                        var templateUrl = AfeLibrary('bootstrap3', scope.component.name).templateUrl
                            , attrsNames = Object.keys(attrs);

                        angular.merge(scope.component, FORM_COMPONENT);

                        element.data('$afeEditorController', scope.$canvasCtrl);

                        $http.get(templateUrl, {cache: $templateCache}).success(function (template) {
                            var newEl = angular.element(template);

                            for (var i = 0, len = attrsNames.length; i < len; i++) {
                                var value = attrs[attrsNames[i]]
                                    , name = attrs.$attr[attrsNames[i]]
                                    , currentValue = name && newEl.attr(name);

                                if (currentValue) {
                                    if (name == 'ng-class') {
                                        value = '[' + [currentValue, ',', value].join('') + ']';
                                    } else {
                                        value = [currentValue, value].join(' ');
                                    }
                                }

                                if (name && !name.match(/(^\$|ng-repeat)/g)) {
                                    newEl.attr(name, value);
                                }
                            }

                            newEl.append('<afe-component-hover>');
                            newEl.data('$afeEditorController', scope.$canvasCtrl);
                            newEl = $compile(newEl)(scope);
                            element.after(newEl);

                            var controllerName = newEl.attr('afe-controller');
                            if (controllerName) {
                                $controller(controllerName, {$scope: scope, $element: newEl}, false);
                            }

                            scope.$listCtrl = afeComponentListCtrl;
                        });
                    }
                }
            }
        }
    }

})();