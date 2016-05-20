'use strict';

angular.module('myApp.ecg', ['ngRoute', 'nvd3'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/ecg', {
            templateUrl: 'ecg/ecg.html',
            controller: 'EcgCtrl'
        });
    }])


    .controller('EcgCtrl', ['$scope', function ($scope) {

        $scope.chart = {};

        $scope.options = {

            "chart": {
                "type": "lineChart",
                "height": 750,
                "margin": {
                    "top": 20,
                    "right": 20,
                    "bottom": 40,
                    "left": 55
                },
                "useInteractiveGuideline": true,
                "dispatch": {},
                "xAxis": {
                    "axisLabel": "Time (ms)",
                    showMaxMin: false,
                },
                "yAxis": {
                    "axisLabel": "Voltage (v)",
                    "axisLabelDistance": -10
                }
                ,
                zoom: {
                    //NOTE: All attributes below are optional
                    enabled: true,
                    scale: 1,
                    scaleExtent: [1, 10],
                    translate: [0, 0],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomed: function (xDomain, yDomain) {
                        var domains = {x1: 0, x2: 0, y1: 0, y2: 0};
                        return domains;
                    },
                    unzoomEventType: 'dblclick.zoom'
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


        $scope.chart.data = [];

        var chart;
        var apiChart;
        var chartScope = {};

        $scope.chart.ready = function (scope, element) {
            // this code will be applied once directive has been created
            // scope - is the directive internal scope
            // element - directive DOM element
            chart = scope.chart;
            apiChart = scope.api;
            chartScope = scope;
        };

        $scope.$on('DataProcessCompleteEvent', function () {

            chartScope.data = [
                {
                    color: "#ff7f0e",
                    key: "2222 Wave",
                    seriesIndex: 0,
                    values: $scope.acquiredData
                }
            ];
            apiChart.refresh();

            //var chart = $scope.chart.api.getScope().chart;
            var svg = d3.select('#chart svg');

            addZoom({
                xAxis: chart.xAxis,
                yAxis: chart.yAxis,
                yDomain: chart.yDomain,
                xDomain: chart.xDomain,
                redraw: function () {
                    chart.update()
                },
                svg: svg
            });

            nv.utils.windowResize(chart.update);
        });

        function addZoom(options) {
            // scaleExtent
            var scaleExtent = 10;

            // parameters
            var yAxis = options.yAxis;
            var xAxis = options.xAxis;
            var xDomain = options.xDomain || xAxis.scale().domain;
            var yDomain = options.yDomain || yAxis.scale().domain;
            var redraw = options.redraw;
            var svg = options.svg;
            var discrete = options.discrete;

            // scales
            var xScale = xAxis.scale();
            var yScale = yAxis.scale();

            // min/max boundaries
            var x_boundary = xScale.domain().slice();
            var y_boundary = yScale.domain().slice();

            // create d3 zoom handler
            var d3zoom = d3.behavior.zoom();

            // ensure nice axis
            xScale.nice();
            yScale.nice();

            // fix domain
            function fixDomain(domain, boundary) {
                if (discrete) {
                    domain[0] = parseInt(domain[0]);
                    domain[1] = parseInt(domain[1]);
                }
                domain[0] = Math.min(Math.max(domain[0], boundary[0]), boundary[1] - boundary[1] / scaleExtent);
                domain[1] = Math.max(boundary[0] + boundary[1] / scaleExtent, Math.min(domain[1], boundary[1]));
                return domain;
            };

            // zoom event handler
            function zoomed() {
                yDomain(fixDomain(yScale.domain(), y_boundary));
                xDomain(fixDomain(xScale.domain(), x_boundary));
                redraw();
            };

            // zoom event handler
            function unzoomed() {
                xDomain(x_boundary);
                yDomain(y_boundary);
                redraw();
                d3zoom.scale(1);
                d3zoom.translate([0, 0]);
            };

            // initialize wrapper
            d3zoom.x(xScale)
                .y(yScale)
                .scaleExtent([1, scaleExtent])
                .on('zoom', zoomed);

            // add handler
            d3.select('#chart').call(d3zoom).on('dblclick.zoom', unzoomed);
        };


    }]);



