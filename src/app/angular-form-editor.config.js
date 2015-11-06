(function() {

    angular.module('angular-form-editor')
        .config(Config);

    function Config(AfeLibraryProvider, AFE_LIBRARY) {

        angular.forEach(AFE_LIBRARY.libraries, function(library) {
            AfeLibraryProvider.add(library);
        });

    }

})();