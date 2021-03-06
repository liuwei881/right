define(['angular'], function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name rightApp.controller:DepartmentCtrl
     * @description
     * # DepartmentCtrl
     * Controller of the rightApp
     */
    angular.module('rightApp.controllers.DepartmentCtrl', [])
        .controller('DepartmentCtrl', function ($scope, $state, $uibModal, Async, Sync) {

        $scope.total = 0;
        $scope.pageSize = 15;
        $scope.page = 1;
        $scope.searchKey = '';
        $scope.initPage = function(searchKey){
            Async.get('/api/v2/department/', {page: $scope.page, pageSize: $scope.pageSize, searchKey:searchKey}).
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
            var companylist = JSON.parse(Sync.fetch('/api/v2/companyshow/'));
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
                        return {'title':'新建部门','companylist': companylist};
                    }
                }
            });
            modalInstance.save = function (item) {console.log(item);
                Async.save('/api/v2/department/',item).
                    success(function (data) {
                        modalInstance.close();
                        $scope.initPage();
                    }).error(function (data){
                        $scope.initPage();
                    });
            };
        };

        $scope.detaildepartment = function (i) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'detaildepartment.html',
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

        $scope.editdepartment = function (i) {
            var companylist = JSON.parse(Sync.fetch('/api/v2/companyshow/'));
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'editdepartment.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.rows[i];
                    },
                    title: function () {
                        return {'title':'修改部门','companylist': companylist};
                    }
                }
            });
           modalInstance.departput = function (item) {
                Async.departput('/api/v2/department/',item).
                    success(function (data) {
                    console.log(item);
                        modalInstance.close();
                        $scope.initPage();
                    }).error(function (data){
                        $scope.initPage();
                    });
            };
        };

        $scope.deletedepartment = function (i) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'deletedepartment.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.rows[i];
                    },
                    title: function () {
                        return {'title':'删除部门'};
                    }
                }
            });
           modalInstance.departdel = function (item) {
                Async.departdel('/api/v2/department/', item).
                    success(function (data) {
                    console.log(item);
                        modalInstance.close();
                        $scope.initPage();
                    }).error(function (data){
                        $scope.initPage();
                    });
            };
        };

        $scope.Search = function (searchKey) {
            $scope.initPage(searchKey);
        };

        $scope.pageAction = function (page) {
            Async.get({page: page}).success(function (data) {
                    $scope.total = data.total;
                    $scope.rows = data.rows;
                });
        };



        });
});
