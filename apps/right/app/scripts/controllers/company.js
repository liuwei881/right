define(['angular'], function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name rightApp.controller:CompanyCtrl
     * @description
     * # CompanyCtrl
     * Controller of the rightApp
     */
    angular.module('rightApp.controllers.CompanyCtrl', [])
        .controller('CompanyCtrl', function ($scope, $state, $uibModal, Async) {

        $scope.total = 0;
        $scope.pageSize = 15;
        $scope.page = 1;
        $scope.searchKey = '';
        $scope.initPage = function(searchKey){
            Async.get('/api/v2/company/', {page: $scope.page, pageSize: $scope.pageSize, searchKey:searchKey}).
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
                        return {'title':'新建公司'};
                    }
                }
            });
            modalInstance.save = function (item) {console.log(item);
                Async.save('/api/v2/company/', item).
                    success(function (data) {
                        modalInstance.close();
                        $scope.initPage();
                    }).error(function (data){
                        $scope.initPage();
                    });
            };
        };


        $scope.editcompany = function (i) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'editcompany.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.rows[i];
                    },
                    title: function () {
                        return {'title':'修改公司'};
                    }
                }
            });
           modalInstance.companyput = function (item) {
                Async.companyput('/api/v2/company/', item).
                    success(function (data) {
                    console.log(item);
                        modalInstance.close();
                        $scope.initPage();
                    }).error(function (data){
                        $scope.initPage();
                    });
            };
        };

        $scope.deletecompany = function (i) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'deletecompany.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.rows[i];
                    },
                    title: function () {
                        return {'title':'删除公司'};
                    }
                }
            });
           modalInstance.companydel = function (item) {
                Async.companydel('/api/v2/company/', item).
                    success(function (data) {
                    console.log(item);
                        modalInstance.close();
                        $scope.initPage();
                    }).error(function (data){
                        $scope.initPage();
                    });
            };
        };

        $scope.detailcompany = function (i) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'detailcompany.html',
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
            Async.get({page: page}).success(function (data) {
                    $scope.total = data.total;
                    $scope.rows = data.rows;
                });
        };

        });
});
