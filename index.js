var WWR = WWR || angular.module('willWeRetireApp', ['ngRoute']);

WWR.config(function ($routeProvider) {
    'use strict';
    //console.log(console.window.location);
    console.log('hi');

    $routeProvider
        .when('/', {
            templateUrl: "pages/home.html",
            controller: "mainController"
        })
        .when('/payChris',{
            templateUrl: 'pages/payChris/payChris.html',
            controller: 'payChrisController'
        })
        .when('/checkNumbers',{
            templateUrl: 'pages/checkNumbers/checkNumbers.html',
            controller: 'checkNumbersController'
        })
        .otherwise({
            templateUrl: 'pages/home.html',
            controller: 'defaultController'
        });
});

WWR.controller('mainController', ['$scope', '$log', function ($scope, $log) {
    'use strict';
    $log.info('Entering mainController');
}]);

WWR.controller('defaultController', ['$scope', '$log', function ($scope, $log) {
    'use strict';
    $log.info('Entering defaultController');
}]);


WWR.controller('payChrisController', ['$scope', '$log', function ($scope, $log) {
    'use strict';
    $log.info('Entering payChrisController');
}]);

WWR.controller('checkNumbersController', ['$scope', '$log', function ($scope, $log) {
    'use strict';
    $log.info('Entering checkNumbersController');
}]);

WWR.run(['$rootScope','$location', '$routeParams', function($rootScope, $location, $routeParams) {
    $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
        console.log('Current route name: ' + $location.path());
        // Get all URL parameter
        console.log($routeParams);
    })
}]);