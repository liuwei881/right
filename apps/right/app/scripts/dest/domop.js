define(['angular'], function (angular) {
    'use strict';

    /**
     * @ngdoc function
     * @name rightApp.controller:CompanyCtrl
     * @description
     * # CompanyCtrl
     * Controller of the rightApp
     */
    angular.module('rightApp.dest.CompanyCtrl', [])
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

    angular.module('rightApp.dest.DepartmentCtrl', [])
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
    angular.module('rightApp.dest.FooterCtrl', [])
        .controller('FooterCtrl', function ($scope) {
           
            $scope.$on('$includeContentLoaded', function () {
                Layout.initFooter(); // init footer
            });
        });
    angular.module('rightApp.dest.HeaderCtrl', [])
        .controller('HeaderCtrl', function ($scope,$cookies,$state,$uibModal,$http,Async) {

            $scope.initPage = function(){
            Async.get('/api/v2/username/').
                success(function (data) {
                    $scope.username = data.username;
                    $scope.rows = data.rows;
                });
        };

            $scope.$on('$includeContentLoaded', function () {
                Layout.initHeader();
                $scope.initPage();
            });

            $scope.Logout = function() {
                $cookies.remove('user');
                $http.get('/api/v2/logout');
                $state.go('login');

            };

            $scope.edit = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'edit.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.rows;
                    },
                    title: function () {
                        return {'title':'修改密码'};
                    }
                }
            });
           modalInstance.userput = function (item) {
                Async.userput('/api/v2/changepasswd/',item).
                    success(function (data) {
                    console.log(item);
                        modalInstance.close();
                        $scope.initPage();
                    });
            };
        };

        $scope.person = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'person.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.rows;
                    },
                    title: function () {
                        return {'title':'修改个人资料'};
                    }
                }
            });
           modalInstance.userput = function (item) {
                Async.userput('/api/v2/username/',item).
                    success(function (data) {
                    console.log(item);
                        modalInstance.close();
                        $scope.initPage();
                    });
            };
        };

        });

    angular.module('rightApp.dest.LoginCtrl', [])
        .controller('LoginCtrl', function ($scope, $http, $state) {

            $scope.Login = function () {
                if ($scope.username !== undefined > 0 && $scope.password !== undefined) {
                    $http.get('/api/v2/right/login', {
                        params:{'user': $scope.username, 'password': $scope.password}
                    }).
                    success(function (data) {
                        switch (data.status){
                            case 200:
                                $scope.alert = {type: 'alert-success', message: '登陆成功'}
                                $state.go('dashboard');
                                break;
                            case 404:
                                $scope.alert = {type: 'alert-danger', message: '帐号密码错误'}
                                break;
                            case 400:
                                $scope.alert = {type: 'alert-danger', message: '此用户没有分配角色，请联系管理员'}
                                break;
                        }
                    });
                } else {
                    $scope.alert = {type: 'alert-danger', message: '请输入帐号密码'}
                }
            }
        });
    angular.module('rightApp.dest.LogoutCtrl', [])
        .controller('LogoutCtrl', function ($scope, $http, $state) {

            $scope.Logout = function () {
                $http.get('/api/v2/logout').success(function (data) {
                    alert(data);
                });
                }


        });
  angular.module('rightApp.dest.MainCtrl', [])
    .controller('MainCtrl', function () {
      this._AuthorCompany_ = 'Ciprun';
    });
    angular.module('rightApp.dest.ModalInstanceCtrl', ['ui.bootstrap', 'ui.bootstrap.tpls'])
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

    angular.module('rightApp.dest.PageHeadCtrl', [])
        .controller('PageHeadCtrl', function ($scope) {

        });
    angular.module('rightApp.dest.PositionCtrl', [])
        .controller('PositionCtrl', function ($scope, $state, $uibModal, Async) {

        $scope.total = 0;
        $scope.pageSize = 15;
        $scope.page = 1;
        $scope.searchKey = '';
        $scope.initPage = function(searchKey){
            Async.get('/api/v2/position/', {page: $scope.page, pageSize: $scope.pageSize, searchKey:searchKey}).
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
                        return {'title':'新建职位'};
                    }
                }
            });
            modalInstance.save = function (item) {console.log(item);
                Async.save('/api/v2/position/', item).
                    success(function (data) {
                        modalInstance.close();
                        $scope.initPage();
                    }).error(function (data){
                        $scope.initPage();
                    });
            };
        };


        $scope.editpos = function (i) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'editpos.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.rows[i];
                    },
                    title: function () {
                        return {'title':'修改职位'};
                    }
                }
            });
           modalInstance.posput = function (item) {
                Async.posput('/api/v2/position/', item).
                    success(function (data) {
                    console.log(item);
                        modalInstance.close();
                        $scope.initPage();
                    }).error(function (data){
                        $scope.initPage();
                    });
            };
        };

        $scope.delpos = function (i) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'delpos.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.rows[i];
                    },
                    title: function () {
                        return {'title':'删除职位'};
                    }
                }
            });
           modalInstance.posdel = function (item) {
                Async.posdel('/api/v2/position/', item).
                    success(function (data) {
                    console.log(item);
                        modalInstance.close();
                        $scope.initPage();
                    }).error(function (data){
                        $scope.initPage();
                    });
            };
        };

        $scope.detailpos = function (i) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'detailpos.html',
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

    angular.module('rightApp.dest.RoleCtrl', [])
        .controller('RoleCtrl', function ($scope, $state, $uibModal, Async, Sync) {

        $scope.total = 0;
        $scope.pageSize = 15;
        $scope.page = 1;
        $scope.searchKey = '';
        $scope.initPage = function(searchKey){
            Async.get('/api/v2/roles/', {page: $scope.page, pageSize: $scope.pageSize, searchKey:searchKey}).
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
                        return {'title':'新建角色'};
                    }
                }
            });
            modalInstance.save = function (item) {console.log(item);
                Async.save('/api/v2/roles/',item).
                    success(function (data) {
                        modalInstance.close();
                        $scope.initPage();
                    }).error(function (data){
                        $scope.initPage();
                    });
            };
        };

        $scope.editrole = function (i) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'editrole.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.rows[i];
                    },
                    title: function () {
                        return {'title':'编辑角色'};
                    }
                }
            });
           modalInstance.roleput = function (item) {
                Async.roleput('/api/v2/roles/',item).
                    success(function (data) {
                    console.log(item);
                        modalInstance.close();
                        $scope.initPage();
                    }).error(function (data){
                        $scope.initPage();
                    });
            };
        };

        $scope.detailrole = function (i) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'detailrole.html',
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

        $scope.deleterole = function (i) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'deleterole.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return $scope.rows[i];
                    },
                    title: function () {
                        return {'title':'删除角色'};
                    }
                }
            });
           modalInstance.roledel = function (item) {
                Async.roledel('/api/v2/roles/',item).
                    success(function (data) {
                    console.log(item);
                        modalInstance.close();
                        $scope.initPage();
                    }).error(function (data){
                        $scope.initPage();
                    });
            };
        };

        $scope.roleright = function (RoleId) {
            var allmenu = JSON.parse(Sync.fetch('/api/v2/menu/'));
            console.log(allmenu);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'roleright.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return Sync.showroleright('/api/v2/role/member/', RoleId).then(function(succ){
                            return succ.data.rows;
                            });
                    },
                    title: function () {
                        return {'title':'角色权限分配','allmenu':allmenu};
                    }
                }
            });
           modalInstance.saveroleright = function (item) {
                Async.saveroleright('/api/v2/role/member/', item).
                    success(function (data) {
                    console.log(item);
                        modalInstance.close();
                        $scope.initPage();
                    });
            };
        };

        $scope.userrole = function (RoleId) {
            var companylist = JSON.parse(Sync.fetch('/api/v2/departfunc/'));
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'userright.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    item: function () {
                        return Sync.showuserrole('/api/v2/user/role/', RoleId).then(function(succ){
                            return succ.data.rows;
                            });
                    },
                    title: function () {
                        return {'title':'用户分配','companylist': companylist};
                    }
                }
            });
           modalInstance.saveuserrole = function (item) {
                Async.saveuserrole('/api/v2/user/role/', item).
                    success(function (data) {
                    console.log(item);
                        modalInstance.close();
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
    angular.module('rightApp.dest.SidebarCtrl', [])
        .controller('SidebarCtrl', function ($scope) {

            $scope.$on('$includeContentLoaded', function () {
                Layout.initSidebar();
            });

            $scope.pageSidebarClosed= false;
        });
    angular.module('rightApp.dest.UserCtrl', [])
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
