define(['angular'], function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name rightApp.controller:FooterCtrl
     * @description
     * # FooterCtrl
     * Controller of the rightApp
     */
    angular.module('rightApp.controllers.FooterCtrl', [])
        .controller('FooterCtrl', function ($scope) {
           
            $scope.$on('$includeContentLoaded', function () {
                Layout.initFooter(); // init footer
            });
        });
});
