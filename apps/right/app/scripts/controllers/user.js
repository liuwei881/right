define(['angular'], function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name rightApp.controller:UserCtrl
     * @description
     * # UserCtrl
     * Controller of the rightApp
     */
    angular.module('rightApp.controllers.UserCtrl', [])
        .controller('UserCtrl', function ($scope, $state, $uibModal, Async, Sync) {

        $scope.total = 0;
        $scope.pageSize = 15;
        $scope.page = 1;
        $scope.searchKey = '';
        $scope.initPage = function(searchKey){
            Async.get('/api/v2/user/', {page: $scope.page, pageSize: $scope.pageSize, searchKey:searchKey}).
                success(function (data) {
                    $scope.searchKey = searchKey;
                    $scope.total = data.total;
                    $scope.rows = data.rows;
                    $scope.success = data.success;
                    $scope.username = data.username;
                });
        };

        if ($state.current.needRequest) {
            $scope.initPage();
        }

        $scope.Create = function () {
            var companylist = JSON.parse(Sync.fetch('/api/v2/departfunc/'));
            var positionlist = JSON.parse(Sync.fetch('/api/v2/positionshow/'));
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'add.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return {};
                    },
                    title: function () {
                        return {'title':'新建用户','companylist': companylist,'positionshow':positionlist};
                    }
                }
            });
            modalInstance.save = function (item) {console.log(item);
                Async.save('/api/v2/user/',item).
                    success(function (data) {
                        modalInstance.close();
                        $scope.initPage();
                    }).error(function (data){
                        $scope.initPage();
                    });
            };
        };


        $scope.edituser = function (i) {
            var companylist = JSON.parse(Sync.fetch('/api/v2/departfunc/'));
            var positionlist = JSON.parse(Sync.fetch('/api/v2/positionshow/'));
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'edituser.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.rows[i];
                    },
                    title: function () {
                        return {'title':'编辑用户','companylist': companylist,'positionshow':positionlist};
                    }
                }
            });
           modalInstance.userput = function (item) {
                Async.userput('/api/v2/user/',item).
                    success(function (data) {
                    console.log(item);
                        modalInstance.close();
                        $scope.initPage();
                    }).error(function (data){
                        $scope.initPage();
                    });
            };
        };

        $scope.deleteuser = function (i) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'deleteuser.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.rows[i];
                    },
                    title: function () {
                        return {'title':'删除用户'};
                    }
                }
            });
           modalInstance.userdel = function (item) {
                Async.userdel('/api/v2/user/',item).
                    success(function (data) {
                    console.log(item);
                        modalInstance.close();
                        $scope.initPage();
                    }).error(function (data){
                        $scope.initPage();
                    });
            };
        };

        $scope.detailuser = function (i) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'detailuser.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.rows[i];
                    },
                    title: function () {
                        return '查看';
                    }
                }
            });
        };

        $scope.Search = function (searchKey) {
            $scope.initPage(searchKey);
        };

        $scope.pageAction = function (page) {
            Async.get('/api/v2/user/',{page: page}).success(function (data) {
                    $scope.total = data.total;
                    $scope.rows = data.rows;
                });
        };



        });
});
