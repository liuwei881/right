define(['angular'], function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name rightApp.controller:ModalInstanceCtrlCtrl
     * @description
     * # ModalInstanceCtrlCtrl
     * Controller of the rightApp
     */
    angular.module('rightApp.controllers.ModalInstanceCtrl', ['ui.bootstrap', 'ui.bootstrap.tpls'])
        .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, item, title) {

            $scope.item = item;
            $scope.title = title;
            $scope.Save = function () {
                $uibModalInstance.save($scope.item);
                $scope.alert = {type: 'alert-danger', message: '权限不足,无法操作!!!'};
            };

            $scope.Delete = function () {
                $uibModalInstance.Delete($scope.item);
                $scope.alert = {type: 'alert-danger', message: '权限不足,无法操作!!!'};
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.diyfun = function (params) {
                $uibModalInstance.diyfun(params);
            };

            $scope.roleput = function () {
                $uibModalInstance.roleput($scope.item);
                $scope.alert = {type: 'alert-danger', message: '权限不足,无法操作!!!'};
            };

            $scope.saveroleright = function () {
                $uibModalInstance.saveroleright($scope.item);
            };

            $scope.showroleright = function () {
                $uibModalInstance.showroleright($scope.item);
            };

            $scope.saveuserrole = function () {
                $uibModalInstance.saveuserrole($scope.item);
            };

            $scope.showuserrole = function () {
                $uibModalInstance.showuserrole($scope.item);
            };

            $scope.userput = function () {
                $uibModalInstance.userput($scope.item);
                $scope.alert = {type: 'alert-danger', message: '权限不足,无法操作!!!'};
            };

            $scope.posput = function () {
                $uibModalInstance.posput($scope.item);
                $scope.alert = {type: 'alert-danger', message: '权限不足,无法操作!!!'};
            };

            $scope.departput = function () {
                $uibModalInstance.departput($scope.item);
                $scope.alert = {type: 'alert-danger', message: '权限不足,无法操作!!!'};
            };

            $scope.companyput = function () {
                $uibModalInstance.companyput($scope.item);
                $scope.alert = {type: 'alert-danger', message: '权限不足,无法操作!!!'};
            };

            $scope.roledel = function () {
                $uibModalInstance.roledel($scope.item);
                $scope.alert = {type: 'alert-danger', message: '权限不足,无法操作!!!'};
            };

            $scope.userdel = function () {
                $uibModalInstance.userdel($scope.item);
                $scope.alert = {type: 'alert-danger', message: '权限不足,无法操作!!!'};
            };

            $scope.posdel = function () {
                $uibModalInstance.posdel($scope.item);
                $scope.alert = {type: 'alert-danger', message: '权限不足,无法操作!!!'};
            };

            $scope.departdel = function () {
                $uibModalInstance.departdel($scope.item);
                $scope.alert = {type: 'alert-danger', message: '权限不足,无法操作!!!'};
            };

            $scope.companydel = function () {
                $uibModalInstance.companydel($scope.item);
                $scope.alert = {type: 'alert-danger', message: '权限不足,无法操作!!!'};
            };
        });
});
