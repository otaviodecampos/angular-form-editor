(function() {

    angular.module('demo')
        .controller('AddComponentCtrl', Controller);

    function Controller(FeLibrary) {
        this.libraries = FeLibrary();
        this.selectedLibraryName = "";

        this.setDefault = function(library) {
            if(library.default) {
                this.selectedLibraryName = library.name;
            }
        }
    }

})();