//Start of the program
//Load the router
(function () {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });

        $stateProvider
            .state('main', {
                url: '/',
                controller: 'MainCtrl as main',
                templateUrl: '/templates/main.html'
            });
    }

    angular
        .module('blocTime', ['ui.router', 'firebase'])
        .config(config);
    
})();
