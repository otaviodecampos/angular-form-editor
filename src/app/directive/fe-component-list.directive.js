(function () {

    angular.module('angular-form-editor')
        .directive('feComponentList', Directive);

    function Directive($parse, FeLibrary) {
        return {
            restrict: 'E',
            templateUrl: 'angular-form-editor/fe-component-list.tpl.html',
            replace: true,
            require: '^feCanvas',
            scope: {
                feList: '=',
                feListOptions: '@',
                feController: '@',
                feEventDragdrop: '@',
                feEventDragover: '@',
                feEventDragstart: '@',
                feEventDragcancel: '@',
                feEventDragend: '@',
                feEventDragleave: '@',
                feEventRemove: '@'
            },
            controller: 'FeComponentListCtrl',
            controllerAs: '$listCtrl',
            transclude: true,
            compile: function compile() {
                return {
                    pre: function (scope, element, attr, ctrl, transcludeFn) {
                        var placeholder = element.find('.dndPlaceholder')
                            , transcludeElement = transcludeFn()
                            , listPlaceholder = transcludeElement.parent().children('fe-component-list-placeholder');

                        scope.$canvasCtrl = ctrl;
                        var options = scope.$options = scope.$listCtrl.$options = $parse(scope.feListOptions)(scope) || {};

                        if (options.notAllowed) {
                            var allowed = [];

                            var components = FeLibrary('bootstrap3');
                            angular.forEach(components, function(component) {
                                if (options.notAllowed.indexOf(component.name) == -1) {
                                    allowed.push(component.name);
                                }
                            });
                            options.allowed = JSON.stringify(allowed);
                        }

                        if (listPlaceholder.length) {
                            $(listPlaceholder.get()[0].attributes).each(function () {
                                var value = this.nodeValue.replace('ng-scope', '');
                                placeholder.attr(this.nodeName, value + placeholder.attr(this.nodeName));
                            });
                        } else {
                            options.showGhost = true;
                        }

                        placeholder.html(listPlaceholder.html());
                        element.append(transcludeElement);
                        listPlaceholder.remove();
                    }
                }
            }
        }
    }

})();