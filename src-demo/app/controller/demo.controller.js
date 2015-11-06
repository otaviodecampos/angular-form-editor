(function() {

    angular.module('demo')
        .controller('DemoCtrl', Controller);

    function Controller(DEMO) {

        this.layout = DEMO.layout;
        this.model = DEMO.model;

    }

})();