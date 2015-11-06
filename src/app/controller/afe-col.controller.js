(function () {

    angular.module('angular-form-editor')
        .controller('AfeColCtrl', Controller);

    function Controller($scope, AfeLibrary) {

        var _this = this
            , component = $scope.component;

        component.setWidth = setWidth;

        if(!component.properties) {
            component.properties = angular.copy(AfeLibrary('bootstrap3', 'col').properties);
        } else if(!component.properties.width) {
            component.properties.width = angular.copy(AfeLibrary('bootstrap3', 'col').properties.width);
        }

        $scope.$watch('component.properties.width', function() {
            setWidth(component.properties.width, true);
        }, true);

        function setWidth(widths, save) {
            if(widths) {
                var widthNames = Object.keys(widths)
                    , name
                    , width;

                _this.class = '';

                for(var i = 0, len = widthNames.length; i < len; i++) {
                    name = widthNames[i];
                    width = widths[name];
                    _this.class = _this.class + ['col', name, width].join('-');
                    if(i != len) {
                        _this.class = _this.class + ' ';
                    }
                }

                if(save) {
                    angular.extend(component.properties.width, widths);
                }
            }
        }

    }

})();
