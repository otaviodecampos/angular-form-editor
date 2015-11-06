(function () {

    angular.module('angular-form-editor')
        .controller('AfeCanvasCtrl', Controller);

    function Controller($element) {

        this.showProperties = false;

        this.select = function(component, event) {
            this.selected = component;
        }

        this.openProperties = function(component, event) {
            var clientRect = $element.get(0).getBoundingClientRect();
            var eventElement = angular.element(event.target);
            var componentElement = eventElement.closest('.afe-component');

            window.teste = componentElement

            this.propertiesY = clientRect.top + componentElement.offset().top;
            this.propertiesX = (clientRect.left + 42) - componentElement.offset().left;
            this.showProperties = true;
            event.stopPropagation();
        }

        this.closeProperties = function() {
            this.showProperties = false;
        }

    }

})();
