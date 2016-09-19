define(['angular'], function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name portalApp.controller:HeaderCtrl
     * @description
     * # HeaderCtrl
     * Controller of the portalApp
     */
    angular.module('portalApp.controllers.HeaderCtrl', [])
        .controller('HeaderCtrl', function ($scope,$cookies,$state) {
           
            $scope.$on('$includeContentLoaded', function () {
                Layout.initHeader();
            });
            $scope.Login = function() {
                $cookies.remove('user');
                $state.go('login');
            };

        });
});
