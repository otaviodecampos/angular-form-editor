(function () {

    angular.module('angular-form-editor')
        .controller('FeComponentListCtrl', Controller);

    function Controller($scope, $element, $timeout, $parse, $http, $templateCache, $compile, FeLibrary) {

        var _this = this;

        // action events

        this.remove = function (component, event) {

            var remove = true;

            if ($scope.feEventRemove) {
                var fn = $parse($scope.feEventRemove)($scope.$parent);
                remove = fn(component, event);
            }

            if (remove) {
                $scope.feList.splice($scope.feList.indexOf(component), 1);

                if (angular.isFunction(remove)) {
                    remove();
                }

                $scope.$emit('resizeFrame');
            }

        }

        // drag events

        $element.on('dragleave', function (event) {
            $timeout(function () {
                if (!$element.hasClass("dndDragover")) {
                    _this.dragleave(event);
                }
            }, 100);
        });

        this.dragstart = function (component, event) {
            if ($scope.feEventDragstart) {
                var fn = $parse($scope.feEventDragstart)($scope.$parent);
                if(fn) fn(component, event);
            }
        }

        this.dragend = function (component, event) {
            if ($scope.feEventDragend) {
                var fn = $parse($scope.feEventDragend)($scope.$parent);
                if(fn) fn(component, event);
            }

            $scope.$emit('resizeFrame');
        }

        this.dragcancel = function (component, event) {
            if ($scope.feEventDragcancel) {
                var fn = $parse($scope.feEventDragcancel)($scope.$parent);
                if(fn) fn(component, event);
            }

            $scope.$emit('resizeFrame');
        }

        this.dragleave = function (event) {
            if ($scope.feEventDragleave) {
                var fn = $parse($scope.feEventDragleave)($scope.$parent);
                if(fn) fn(event);
            }

            $scope.$emit('resizeFrame');
        }

        this.dragdrop = function (event, index, component, external, type) {
            component.order = index;

            if ($scope.feEventDragdrop) {
                var fn = $parse($scope.feEventDragdrop)($scope.$parent);
                if(fn) component = fn(event, index, component, external, type);
            }

            $scope.$emit('resizeFrame');

            return component;
        }

        var lastType;
        this.dragover = function (event, index, type) {
            var allow = true;

            if ($scope.feEventDragover) {
                var fn = $parse($scope.feEventDragover)($scope.$parent);
                if(fn) allow = fn(event, index, type);
            }

            if(allow) {
                if($scope.$options.showGhost && lastType != type) {
                    lastType = type;
                    $http.get(FeLibrary('bootstrap3', type).templateUrl, {cache: $templateCache}).success(function (template) {
                        getPlaceHolder().html($compile(template)($scope));
                    });
                }

                $scope.$emit('resizeFrame');
            }

            return allow;
        }

        // functions

        function getPlaceHolder() {
            return $element.find('.dndPlaceholder');
        }

    }

})();
