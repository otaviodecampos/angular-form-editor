(function () {

    angular.module('angular-form-editor')
        .controller('AfeComponentListCtrl', Controller);

    function Controller($scope, $element, $timeout, $parse, $http, $templateCache, $compile, AfeLibrary) {

        var _this = this;

        // action events

        this.remove = function (component, event) {

            var remove = true;

            if ($scope.afeEventRemove) {
                var fn = $parse($scope.afeEventRemove)($scope.$parent);
                remove = fn(component, event);
            }

            if (remove) {
                $scope.afeList.splice($scope.afeList.indexOf(component), 1);

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
            if ($scope.afeEventDragstart) {
                var fn = $parse($scope.afeEventDragstart)($scope.$parent);
                if(fn) fn(component, event);
            }
        }

        this.dragend = function (component, event) {
            if ($scope.afeEventDragend) {
                var fn = $parse($scope.afeEventDragend)($scope.$parent);
                if(fn) fn(component, event);
            }

            $scope.$emit('resizeFrame');
        }

        this.dragcancel = function (component, event) {
            if ($scope.afeEventDragcancel) {
                var fn = $parse($scope.afeEventDragcancel)($scope.$parent);
                if(fn) fn(component, event);
            }

            $scope.$emit('resizeFrame');
        }

        this.dragleave = function (event) {
            if ($scope.afeEventDragleave) {
                var fn = $parse($scope.afeEventDragleave)($scope.$parent);
                if(fn) fn(event);
            }

            $scope.$emit('resizeFrame');
        }

        this.dragdrop = function (event, index, component, external, type) {
            component.order = index;

            if ($scope.afeEventDragdrop) {
                var fn = $parse($scope.afeEventDragdrop)($scope.$parent);
                if(fn) component = fn(event, index, component, external, type);
            }

            $scope.$emit('resizeFrame');

            return component;
        }

        var lastType;
        this.dragover = function (event, index, type) {
            var allow = true;

            if ($scope.afeEventDragover) {
                var fn = $parse($scope.afeEventDragover)($scope.$parent);
                if(fn) allow = fn(event, index, type);
            }

            if(allow) {
                if($scope.$options.showGhost && lastType != type) {
                    lastType = type;
                    $http.get(AfeLibrary('bootstrap3', type).templateUrl, {cache: $templateCache}).success(function (template) {
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
