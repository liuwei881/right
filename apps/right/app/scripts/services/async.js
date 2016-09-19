define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name rightApp.Async
   * @description
   * # Async
   * Service in the rightApp.
   */
  angular.module('rightApp.services.Async', [])
	.service('Async', function ($http) {
	// AngularJS will instantiate a singleton by calling "new" on this function
	    function get(url, params){
            return $http.get(url, {params: params})
        }

        function save(url, params) {
            var urlArr = url.split('/');
            var len = urlArr.length;
            if (!isNaN(parseInt(urlArr[len-1])) && parseInt(urlArr[len-1]) != NaN) {
                return $http.put(url, {params: params});
            } else {
                return $http.post(url, {params: params});
            }
        }

        function roleput(url, params) {
            if (params.RoleId != undefined) {
                return $http.put(url + params.RoleId, {params: params})
            } else {
                return $http.post(url, {params: params})
            }
        }

        function userput(url, params) {
            if (params.UserId != undefined) {
                return $http.put(url + params.UserId, {params: params})
            } else {
                return $http.post(url, {params: params})
            }
        }

        function posput(url, params) {
            if (params.PositionId != undefined) {
                return $http.put(url + params.PositionId, {params: params})
            } else {
                return $http.post(url, {params: params})
            }
        }

        function departput(url, params) {
            if (params.DepartmentId != undefined) {
                return $http.put(url + params.DepartmentId, {params: params})
            } else {
                return $http.post(url, {params: params})
            }
        }

        function companyput(url, params) {
            if (params.CompanyId != undefined) {
                return $http.put(url + params.CompanyId, {params: params})
            } else {
                return $http.post(url, {params: params})
            }
        }

        function saveroleright(url, params) {
            return $http.post(url + params.RoleId, {params: params})
        }

        function saveuserrole(url, params) {
            return $http.post(url + params.RoleId, {params: params})
        }

        function del(url) {
            return $http.delete(url, {params: params});
        }

         function roledel(url, params) {
            return $http.delete(url + params.RoleId);
        }

        function userdel(url, params) {
            return $http.delete(url + params.UserId);
        }

        function posdel(url, params) {
            return $http.delete(url + params.PositionId);
        }

        function departdel(url, params) {
            return $http.delete(url + params.DepartmentId);
        }

        function companydel(url, params) {
            return $http.delete(url + params.CompanyId);
        }

        return {
            get : get,
            save : save,
            roleput : roleput,
            userput : userput,
            saveroleright : saveroleright,
            saveuserrole : saveuserrole,
            roledel : roledel,
            userdel : userdel,
            posput  : posput,
            posdel  : posdel,
            departput : departput,
            departdel : departdel,
            companyput: companyput,
            companydel: companydel,
            del : del
        }
	});
});
