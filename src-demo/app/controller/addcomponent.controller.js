(function() {

    angular.module('demo')
        .controller('AddComponentCtrl', Controller);

    function Controller(AfeLibrary) {
        this.libraries = AfeLibrary();
        this.selectedLibraryName = "";

        this.setDefault = function(library) {
            if(library.default) {
                this.selectedLibraryName = library.name;
            }
        }
    }

})();