(function () {

    angular.module('angular-form-editor')
        .directive('afeCanvas', Directive);

    function Directive($compile, $templateCache, $timeout) {

        var CONTROLLER_NAME = '$afeCanvasController'
            , TEMPLATE_URL  = 'angular-form-editor/afe-canvas.tpl.html'
            , RESIZE_EVENT = 'resizeFrame'

        return {
            restrict: 'E',
            scope: {
                model: "=",
                layout: "="
            },
            template: '<iframe class="afe-canvas"></iframe>',
            controller: "AfeCanvasCtrl as canvas",
            replace: true,
            bindToController: true,
            transclude: true,
            link: function (scope, element, attrs, ctrl, transclude) {

                var document = element[0].contentDocument
                    , head = angular.element(document.head)
                    , body = angular.element(document.body)
                    , template = $templateCache.get(TEMPLATE_URL);

                transclude(scope, function (clone) {
                    element.parent().data(CONTROLLER_NAME, ctrl);
                    element.after(clone);
                });

                head.append($('<link/>', {
                    rel: 'stylesheet',
                    href: '/vendor/angular-form-editor/angular-form-editor.css',
                    type: 'text/css'
                }));

                // jqLite.inheritedData does not cross out of iframe,
                // this is necessary to maintain the behavior of require
                body.data(CONTROLLER_NAME, ctrl);
                body.append($compile(template)(scope));
                body.addClass('afe-canvas-body');

                $timeout(function () {
                    resizeFrame();
                });

                scope.$on(RESIZE_EVENT, function () {
                    $timeout(function () {
                        resizeFrame();
                    });
                });

                function resizeFrame() {
                    var innerHeight = body.children().get(0).scrollHeight
                        , outerHeight = element.height();
                    if (innerHeight > outerHeight) {
                        element.height(innerHeight);
                    }
                }
            }
        }
    }

})();