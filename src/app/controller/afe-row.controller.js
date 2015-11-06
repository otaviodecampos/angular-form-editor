(function () {

    angular.module('angular-form-editor')
        .controller('AfeRowCtrl', Controller);

    function Controller($scope, $element, $timeout) {


        var row = $scope.component
            , cols = row.components;

        // action events
        this.remove = function (component, event) {
            return function () {
                initColumns(0, true);
            }
        }

        // drag events

        this.dragdrop = function (event, index, component, external, type) {
            $timeout(function () {
                initColumns(0, true);
            });
            return component;
        }

        this.dragover = function (event, index, type) {
            var placeholder = getPlaceHolder();
            $timeout(function () {
                var clazz = 'col-md-' + getColWidth(1);
                if (!placeholder.hasClass(clazz)) {
                    initPlaceHolder();
                    var width = initColumns(1);
                    placeholder.addClass('col-xs-' + width);
                    placeholder.addClass('col-sm-' + width);
                    placeholder.addClass('col-md-' + width);
                    placeholder.addClass('col-lg-' + width);
                }
            });

            return true;
        }

        this.dragstart = function (component, event) {
            component.$drag = true;
        }

        this.dragend = function (component, event) {
            component.$drag = false;
        }

        this.dragcancel = function (component, event) {
            component.$drag = false;
            initColumns();
        }

        this.dragleave = function (event) {
            initPlaceHolder();
            initColumns();
        }

        // functions
        function getPlaceHolder() {
            return $element.find('.dndPlaceholder');
        }

        function getColWidth(factor) {
            var width = 12,
                count = 0;

            if (factor == undefined) {
                factor = 0;
            }

            for (var i = 0, len = cols.length; i < len; i++) {
                if (!cols[i].$drag) {
                    count++
                }
            }

            if (count) {
                var round = Math.round(12 / (count + factor));
                if (round < 12) {
                    width = round;
                }

                if (round < 1) {
                    width = 1;
                }
            }

            return width;
        }

        function initPlaceHolder() {
            getPlaceHolder().removeClass(function (index, css) {
                return (css.match(/\bcol-\S+/g) || []).join(' ');
            });
        }

        function initColumns(factor, save) {
            var width = getColWidth(factor);

            for (var i = 0, len = cols.length; i < len; i++) {
                var widths = {
                    xs: width,
                    sm: width,
                    md: width,
                    lg: width
                };

                cols[i].setWidth(widths, save);
            }

            return width;
        }

    }

})();
