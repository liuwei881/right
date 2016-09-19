define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc directive
   * @name rightApp.directive:UserNameCheck
   * @description
   * # rightApp
   */
  angular.module('rightApp.directives.UserNameCheck', [])
    .directive('usernameUnique', ['$http', function($http) {
        return {
        require: 'ngModel',
        link: function(scope, ele, attrs, c) {
        scope.$watch(attrs.ngModel, function(n) {
        if (!n) return;
        $http({
          method: 'POST',
          url: '/api/v2/usernamecheck/' + attrs.usernameUnique,
          data: {'username': n},
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
