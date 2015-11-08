(function () {

    angular.module('angular-form-editor')
        .controller('FeComponentCtrl', Controller);

    function Controller($scope, $element, FeLibrary) {

        var component = $scope.component
            , template = FeLibrary('bootstrap3', component.name);
        
        component.$hasProperties = (function() {
            var has = false;
            if(template.properties) {
                has = Object.keys(template.properties).length > 0;
            }
            return has;
        })();
        
    }

})();
