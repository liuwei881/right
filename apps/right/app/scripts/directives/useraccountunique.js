define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc directive
   * @name rightApp.directive:UserAccountCheck
   * @description
   * # rightApp
   */
  angular.module('rightApp.directives.UserAccountCheck', [])
    .directive('useraccountUnique', ['$http', function($http) {
        return {
        require: 'ngModel',
        link: function(scope, ele, attrs, c) {
        scope.$watch(attrs.ngModel, function(n) {
        if (!n) return;
        $http({
          method: 'POST',
          url: '/api/v2/useraccountcheck/' + attrs.useraccountUnique,
          data: {'useraccount': n},
          timeout:500,
        }).success(function(data, status, headers, cfg) {
          c.$setValidity('unique', true);
        }).error(function(data, status, headers, cfg) {
          c.$setValidity('unique', false);
        });
      });
    }
  }
}]);
});
