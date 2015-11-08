(function () {

    angular.module('angular-form-editor')
        .directive('feComponent', Directive);

    function Directive($http, $templateCache, $compile, $controller, FeLibrary, FORM_COMPONENT) {
        return {
            restrict: 'E',
            transclude: 'element',
            require: ['^feComponentList', '^feCanvas'],
            controller: 'FeComponentCtrl as componentCtrl',
            compile: function() {
                return {
                    post: function (scope, element, attrs, ctrls) {
                        
                        var feComponentListCtrl = ctrls[0]
                            , canvasCtrl = ctrls[1]
                            , component = scope.component;
                        
                        var libraryComponent = angular.copy(FeLibrary('bootstrap3', component.name));
                        var templateUrl = libraryComponent.templateUrl
                            , attrsNames = Object.keys(attrs);
                        
                        libraryComponent = angular.merge(angular.copy(FORM_COMPONENT), libraryComponent);
                        
                        var properties = angular.copy(component.properties);
                        angular.merge(component, libraryComponent);
                        angular.extend(component.properties, properties);
                        
                        element.data('$feCanvasController', canvasCtrl);

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

                            newEl.append('<fe-component-hover>');
                            newEl.data('$feCanvasController', canvasCtrl);
                            newEl = $compile(newEl)(scope);
                            element.after(newEl);
                            component.$element = newEl;

                            var controllerName = newEl.attr('fe-controller');
                            if (controllerName) {
                                $controller(controllerName, {$scope: scope, $element: newEl}, false);
                            }

                            scope.$listCtrl = feComponentListCtrl;
                        });
                    }
                }
            }
        }
    }

})();