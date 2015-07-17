var WWR = WWR || angular.module('willWeRetireApp', ['ngRoute']);

WWR.config(function ($routeProvider) {
    'use strict';
    console.log(console.window.location);
    console.log('hi');

    $routeProvider
        .when('/index.html', {
        templateUrl: "mainlayout.html",
        controller: "mainController"
    })
        .when('index.html#/payChris',{
        templateUrl: '/pages/payChris/payChris.html',
        controller: 'payChrisController'
    })
        .otherwise({
        templateUrl: 'mainlayout.html',
        controller: 'mainController'
    });
});

WWR.controller('mainController', ['$scope', '$log', function ($scope, $log) {
    'use strict';
    $log.info('Entering mainController');
}]);


WWR.controller('payChrisController', ['$scope', '$log', function ($scope, $log) {
    'use strict';
    $log.info('Entering payChrisController');
}]);
