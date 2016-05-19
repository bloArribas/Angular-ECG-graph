'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'ngMaterial'
])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.otherwise({redirectTo: '/view1'});

    }])

    .controller('myAppCrtl', ['$scope', function ($scope) {

        $scope.acquiredData = [];

        var parsedData = [];
        var i = 0;

        Papa.parse("http://0.0.0.0:8090/3000.csv", {
            download: true,
            worker: true,
            step: function (row) {
                parsedData[i] = {
                    'series': 0,
                    'x': i,
                    'y': row.data[0][0]
                };
                i++;
                if(i%100 == 0) {
                    console.log('Parsing ECG data');
                }

            },
            complete: function () {
                console.log('ECG data process complete');
                $scope.acquiredData = parsedData;
                $scope.$broadcast('DataProcessCompleteEvent');
            }

        })


    }])
