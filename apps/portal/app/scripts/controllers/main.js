define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name portalApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the portalApp
   */
  angular.module('portalApp.controllers.MainCtrl', [])
    .controller('MainCtrl', function ($scope) {
        this._AuthorCompany_ = 'Ciprun';
        $scope.apps = [{'name':'呼叫中心','url':'callcenter','icon':'http://www.ciprun-oa.com/assets/icon/icon-40-7cf01fb2c6200139b82cbd791dc4d002.png'}];
    });
});
