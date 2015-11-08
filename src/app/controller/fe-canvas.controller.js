(function () {

    angular.module('angular-form-editor')
        .controller('FeCanvasCtrl', Controller);

    function Controller($element) {

        this.showProperties = false;

        this.select = function(component) {
            if(this.selected != component) {
                this.closeProperties();   
            }
            this.selected = component;
        }

        this.openProperties = function(component, event) {
            var el = component.$element
                , rect = el.get(0).getBoundingClientRect();

            event.stopPropagation();

            this.propertiesY = rect.top;
            this.propertiesX = rect.left + rect.width + 10;
            this.showProperties = true;
        }

        this.closeProperties = function() {
            this.showProperties = false;
        }

    }

})();
