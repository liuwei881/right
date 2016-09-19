/*jshint unused: vars */

define(['angular', 'dest/domop', 'directives/paging', 'directives/roleunique','directives/usernameunique','directives/useraccountunique', 'services/httpinterceptor', 'services/async', 'services/sync', 'directives/ngspinnerbar']/*deps*/, function (angular, MainCtrl, PagingDirective,RoleCheckDirective,UserNameCheckDirective, UserAccountCheckDirective, LoginCtrl,  HeaderCtrl, SidebarCtrl, PageHeadCtrl, FooterCtrl, HttpInterceptorFactory, ModalinstanceCtrl,NgSpinnerBarDirective,RoleCtrl,CompanyCtrl,UserCtrl,PositionCtrl,DepartmentCtrl)/*invoke*/ {

  'use strict';

  /**
   * @ngdoc overview
   * @name rightApp
   * @description
   * # rightApp
   *
   * Main module of the application.
   */
  return angular
       .module('rightApp', ['rightApp.dest.MainCtrl',
       'rightApp.directives.Paging',
       'rightApp.directives.RoleCheck',
       'rightApp.directives.UserNameCheck',
       'rightApp.directives.UserAccountCheck',
       'rightApp.dest.LoginCtrl',
       'rightApp.dest.HeaderCtrl',
       'rightApp.dest.SidebarCtrl',
       'rightApp.dest.PageHeadCtrl',
       'rightApp.dest.FooterCtrl',
       'rightApp.services.HttpInterceptor',
       'rightApp.dest.ModalInstanceCtrl',
       'rightApp.dest.RoleCtrl',
       'rightApp.dest.UserCtrl',
       'rightApp.dest.PositionCtrl',
       'rightApp.dest.DepartmentCtrl',
       'rightApp.dest.CompanyCtrl',
       'rightApp.services.Async',
       'rightApp.services.Sync',
       'rightApp.directives.NgSpinnerBar',
       /*angJSDeps*/'ngCookies','ngResource','ngSanitize','ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
       // $httpProvider.interceptors.push('httpInterceptor');
        $stateProvider
            .state('dashboard', {
                url: '/',
                templateUrl: 'views/main.html',
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })

            .state('dashboard.roles', {
                    url: 'roles',
                    templateUrl: 'views/roles.html',
                    controller: 'RoleCtrl',
                    nav: '角色管理',
                    needRequest: true
                })
            .state('dashboard.users', {
                    url: 'users',
                    templateUrl: 'views/users.html',
                    controller: 'UserCtrl',
                    nav: '用户管理',
                    needRequest: true
                })
            .state('dashboard.position', {
                    url: 'positions',
                    templateUrl: 'views/positions.html',
                    controller: 'PositionCtrl',
                    nav: '职位管理',
                    needRequest: true
                })
            .state('dashboard.department', {
                    url: 'departments',
                    templateUrl: 'views/departments.html',
                    controller: 'DepartmentCtrl',
                    nav: '部门管理',
                    needRequest: true
                })
            .state('dashboard.company', {
                    url: 'company',
                    templateUrl: 'views/company.html',
                    controller: 'CompanyCtrl',
                    nav: '公司管理',
                    needRequest: true
                })


     $urlRouterProvider.otherwise('/');
    })
    .run(function ($rootScope, $state, $stateParams, $cookies) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeStart', function (event, toState, fromState) {
            if (toState.url === '/login') {
                $('body').addClass('login');
            }
            else {
                $('body').removeClass('login');
                if ($cookies.get('user') === undefined) {
                    event.preventDefault();
                    $state.go('login');
                }
            }
        });
    });
    ;
});
