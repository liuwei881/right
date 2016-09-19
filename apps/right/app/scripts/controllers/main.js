define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name rightApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the rightApp
   */
  angular.module('rightApp.controllers.MainCtrl', [])
    .controller('MainCtrl', function () {
      this._AuthorCompany_ = 'Ciprun';
    });
});
