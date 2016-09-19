define(['angular'], function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name rightApp.controller:SidebarCtrl
     * @description
     * # SidebarCtrl
     * Controller of the rightApp
     */
    angular.module('rightApp.controllers.SidebarCtrl', [])
        .controller('SidebarCtrl', function ($scope) {

            $scope.$on('$includeContentLoaded', function () {
                Layout.initSidebar();
            });

            $scope.pageSidebarClosed= false;
        });
});
