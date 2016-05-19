'use strict';

angular.module('myApp.view1', ['ngRoute', 'nvd3'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])


    .controller('View1Ctrl', ['$scope', function ($scope) {

        $scope.chart = {};

        $scope.options = {

            "chart": {
                "type": "lineChart",
                "height": 450,
                "margin": {
                    "top": 20,
                    "right": 20,
                    "bottom": 40,
                    "left": 55
                },
                "useInteractiveGuideline": true,
                "dispatch": {},
                "xAxis": {
                    "axisLabel": "Time (ms)"
                },
                "yAxis": {
                    "axisLabel": "Voltage (v)",
                    "axisLabelDistance": -10
                }
            },
            "title": {
                "enable": true,
                "text": "ECG"
            },
            "subtitle": {
                "enable": true,
                "text": "ECG signal acquired through Nuubo device",
                "css": {
                    "text-align": "center",
                    "margin": "10px 13px 0px 7px"
                }
            },
            "caption": {
                "enable": true,
                "html": "<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style=\"text-decoration: underline;\">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style=\"color: darkred;\">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href=\"https://github.com/krispo/angular-nvd3\" target=\"_blank\">2</a>, 3]</sup>.",
                "css": {
                    "text-align": "justify",
                    "margin": "10px 13px 0px 7px"
                }
            }

        };

        $scope.config = {
            visible: true,
            extended: false,
            disabled: false,
            refreshDataOnly: true
        };

        var innerApi = {};


        // setTimeout(function(){
        //     console.log('scope api:', $scope.chart.api);
        //
        //     innerApi = $scope.chart.api;
        //     innerApi.api.getScope().data = [
        //         {
        //             color: "#ff7f0e",
        //             key: "2222 Wave",
        //             seriesIndex: 0,
        //             values: $scope.acquiredData
        //         }
        //     ];
        //     $scope.chart.api.refresh();
        //
        // }, 3000);


        //var innerData = $scope.chart.api.getScope().data;

        $scope.chart.data = [];

        $scope.$on('DataProcessCompleteEvent', function () {
            // $scope.data = [
            //     {
            //         color: "#ff7f0e",
            //         key: "2222 Wave",
            //         seriesIndex: 0,
            //         values: $scope.acquiredData
            //     }
            // ];

            //console.log($scope.$ChildScope);

            //$scope.api.refresh();

            // innerApi.api.getScope().data = [
            //     {
            //         color: "#ff7f0e",
            //         key: "2222 Wave",
            //         seriesIndex: 0,
            //         values: $scope.acquiredData
            //     }
            // ];
            //
            // console.log('got parent event');
            setTimeout(function(){
                //console.log('scope api:', $scope.chart.api);
                $scope.chart.data = [
                    {
                        color: "#ff7f0e",
                        key: "2222 Wave",
                        seriesIndex: 0,
                        values: $scope.acquiredData
                    }
                ];

                // innerApi = $scope.chart.api;
                // innerApi.api.getScope().data = [
                //     {
                //         color: "#ff7f0e",
                //         key: "2222 Wave",
                //         seriesIndex: 0,
                //         values: $scope.acquiredData
                //     }
                // ];

                console.log($scope.chart.api);
                if($scope.chart.api)

                    $scope.chart.api.getScope().data = [
                        {
                            color: "#ff7f0e",
                            key: "2222 Wave",
                            seriesIndex: 0,
                            values: $scope.acquiredData
                        }
                    ];
                    $scope.chart.api.refresh();

            }, 3000);
        });

        $scope.events = {
            DataProcessCompleteEvent: function(e, $scope){

                $scope.api.refreshWithTimeout(5);
                console.log('Refreshed...');
            }
        };


    }]);



