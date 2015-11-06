(function () {

    angular.module('angular-form-editor')
        .provider('AfeLibrary', Provider);

    function Provider() {

        var library = {};

        return {
            $get: function () {
                return function (name, componentName) {
                    var component;

                    if (name && componentName) {
                        var categories = library[name].categories;
                        for (var i = 0, len = categories.length; i < len; i++) {
                            var category = categories[i];
                            for (var i2 = 0, len2 = category.components.length; i2 < len2; i2++) {
                                var c = category.components[i2];
                                if (componentName == c.name) {
                                    component = c;
                                    break;
                                }
                            }
                            if (component) {
                                break;
                            }
                        }
                    } else if(name && library[name] && !componentName) {
                        component = [];
                        var categories = library[name].categories;
                        for (var i = 0, len = categories.length; i < len; i++) {
                            var category = categories[i];
                            component = component.concat(category.components);
                        }
                    }
                    return component || name && library[name] || library;
                }
            },
            add: function (raw) {
                library[raw.name] = raw;
            },
            get: function (name) {
                return library[name];
            }
        }
    }

})();