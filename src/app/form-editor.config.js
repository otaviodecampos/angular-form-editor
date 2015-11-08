(function() {

    angular.module('angular-form-editor')
        .config(Config);

    function Config(FeLibraryProvider, FE_LIBRARY) {

        angular.forEach(FE_LIBRARY.libraries, function(library) {
            FeLibraryProvider.add(library);
        });

    }

})();