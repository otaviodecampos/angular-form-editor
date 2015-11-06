(function () {

    angular.module('angular-form-editor')
        .controller('AfeComponentCtrl', Controller);

    function Controller($scope, AfeLibrary) {

        var component = $scope.component
            , template = AfeLibrary('bootstrap3', component.name);

        component.$hasProperties = (function() {
            var has = false;
            if(template.properties) {
                has = Object.keys(template.properties).length > 0;
            }
            return has
        })();

    }

})();
