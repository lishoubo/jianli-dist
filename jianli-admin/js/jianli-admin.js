var jlApp = angular.module('jlApp', ['ngRoute']);

jlApp.constant('config', {
    host: 'http://121.196.233.31:8080'
});
jlApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}]);

jlApp.filter('range', function () {
    return function (n) {
        var res = [];
        for (var i = 0; i < n; i++) {
            res.push(i);
        }
        return res;
    };
});

jlApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/pages/staff/staff.html',
            controller: 'staffController'
        })
        .when('/building', {
            templateUrl: '/pages/building/building.html',
            controller: 'buildingController'
        })
        .when('/journal', {
            templateUrl: '/pages/journal/journal.html',
            controller: 'journalController'
        })
        .when('/journal/form', {
            templateUrl: '/pages/journal/form.html',
            controller: 'journalController'
        })
        .when('/journal/form/:id', {
            templateUrl: '/pages/journal/form.html',
            controller: 'journalController'
        })
        .when('/baike', {
            templateUrl: '/pages/baike/list.html',
            controller: 'baikeController'
        })
        .when('/baike/form', {
            templateUrl: '/pages/baike/form.html',
            controller: 'baikeController'
        })
        .when('/baike/form/:id', {
            templateUrl: '/pages/baike/form.html',
            controller: 'baikeController'
        });
}]);


jlApp.controller('staffController', ['$scope', '$http', 'config', function ($scope, $http, config) {
    $scope.result = {
        data: {
            page: 0,
            pageSize: 10,
            items: []
        }
    };
    $scope.form = {};

    $scope.go_to_page = function (page) {
        if (!page) {
            page = 1;
        }
        $http.get(
            config.host + "/api/admin/staffs",
            {'params': {'page': page, 'pageSize': 10}}
        ).success(function (response) {
            console.log(response);
            if (response.success) {
                $scope.result.data = response.data;
            } else {
                bootbox.alert({
                        title: "查询失败", message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "查询失败", message: error
                }
            );
        });
    };

    $scope.add_staff = function () {
        $http.post(
            config.host + "/api/admin/staffs",
            $scope.form
        ).success(function (response) {
            if (response.success) {
                $(".modal").modal("hide");
                $scope.go_to_page(1);
            } else {
                bootbox.alert({
                        title: "添加失败",
                        message: response.message,
                        closable: true
                    }
                );
            }
        }).error(function (error) {
            console.log(error);
        });
    };
    $scope.delete_staff = function (id) {
        bootbox.confirm("确定删除吗?", function (confirmed) {
            if (confirmed) {
                $http.post(
                    config.host + "/api/admin/staffs/delete?id=" + id
                ).success(function (response) {
                    if (response.success) {
                        $scope.go_to_page(1);
                    } else {
                        bootbox.alert({
                                title: "删除失败", message: response.message, closable: true
                            }
                        );
                    }
                }).error(function (error) {
                    bootbox.alert({
                            title: "删除失败", message: error, closable: true
                        }
                    );
                });
            }
        });
    };
    $scope.update_staff = function () {
        $http.post(
            config.host + "/api/admin/staffs/update",
            $scope.form
        ).success(function (response) {
            if (response.success) {
                $("#update-staff-modal").modal("hide");
                $scope.go_to_page(1);
            } else {
                bootbox.alert({
                        title: "更新失败", message: response.message, closable: true
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "更新失败", message: error, closable: true
                }
            );
        });
    };
    $scope.open_add_form = function () {
        $scope.form = {};
        $("#add-staff-modal").modal("show");
    };
    $scope.open_update_form = function (id) {
        $http.get(
            config.host + "/api/admin/staffs/queryById?id=" + id
        ).success(function (response) {
            if (response.success) {
                $scope.form = response.data;
                $("#update-staff-modal").modal("show");
            } else {
                bootbox.alert({
                        title: "查询失败", message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "查询失败", message: error
                }
            );

        });
    };
    $scope.go_to_page(1);
}]);

jlApp.controller('buildingController', ['$scope', '$http', 'config', function ($scope, $http, config) {
    $scope.result = {
        data: {
            page: 0,
            pageSize: 10,
            items: []
        }
    };
    $scope.form = {"address": {"distinct": "西湖区"}};

    $scope.go_to_page = function (page) {
        if (!page) {
            page = 1;
        }
        $http.get(
            config.host + "/api/admin/building",
            {'params': {'page': page, 'pageSize': 10}}
        ).success(function (response) {
            $scope.result.data = response.data;
        }).error(function (error) {
            console.log(error);
        });
    };
    $scope.open_update_building = function (id) {
        $http.get(
            config.host + "/api/admin/building/queryById?id=" + id
        ).success(function (response) {
            if (response.success) {
                $scope.form = response.data;
                $("#update-building-modal").modal("show");
            } else {
                bootbox.alert({
                        title: "查询失败", message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "查询失败", message: error
                }
            );

        });
    };
    $scope.open_add_building = function () {
        $scope.form = {"address": {"district": "西湖区"}};
        $("#add-building-modal").modal("show");
    };
    $scope.add_building = function () {
        $http.post(
            config.host + "/api/admin/building",
            $scope.form
        ).success(function (response) {
            if (response.success) {
                $("#add-building-modal").modal("hide");
                $scope.go_to_page(1);
            } else {
                bootbox.alert({
                        title: "添加失败",
                        message: response.message,
                        closable: true
                    }
                );
            }
        }).error(function (error) {
            console.log(error);
        });
    };
    $scope.update_building = function () {
        $http.post(
            config.host + "/api/admin/building/update",
            $scope.form
        ).success(function (response) {
            if (response.success) {
                $("#update-building-modal").modal("hide");
                $scope.go_to_page(1);
            } else {
                bootbox.alert({
                        title: "更新失败",
                        message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "更新失败",
                    message: error
                }
            );
        });
    };
    $scope.delete_building = function (id) {
        bootbox.confirm("确定删除吗?", function (confirmed) {
            if (confirmed) {
                $http.post(
                    config.host + "/api/admin/building/delete?id=" + id
                ).success(function (response) {
                    if (response.success) {
                        $scope.go_to_page(1);
                    } else {
                        bootbox.alert({
                                title: "删除失败", message: response.message, closable: true
                            }
                        );
                    }
                }).error(function (error) {
                    bootbox.alert({
                            title: "删除失败", message: error, closable: true
                        }
                    );
                });
            }
        });
    };
    $scope.go_to_page(1);
}]);

jlApp.controller('baikeController', ['$scope', '$http', '$location', '$routeParams', 'config', function ($scope, $http, $location, $routeParams, config) {
    $scope.form = {"procedure": "PREPARE"};
    $scope.result = {
        data: {
            page: 0,
            pageSize: 10,
            items: []
        }
    };

    $scope.get_baike = function (id) {
        $http.get(
            config.host + "/api/admin/baike/queryById?id=" + id
        ).success(function (response) {
            if (response.success) {
                $scope.form = response.data;
                var div = document.createElement('div');
                div.innerHTML = $scope.form.content;
                $('#baike-editor').summernote("insertNode", div);
            } else {
                bootbox.alert({
                        title: "查询失败", message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "查询失败", message: error
                }
            );

        });
    };

    $scope.add_baike = function () {
        var content = $('#baike-editor').summernote('code');
        $scope.form.content = content;
        $http.post(
            config.host + "/api/admin/baike",
            $scope.form
        ).success(function (response) {
            if (response.success) {
                $location.path("/baike");
            } else {
                bootbox.alert({
                        title: "添加失败",
                        message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "添加失败",
                    message: error
                }
            );
        });
    };

    $scope.update_baike = function () {
        var content = $('#baike-editor').summernote('code');
        $scope.form.content = content;
        console.log($scope.form);
        $http.post(
            config.host + "/api/admin/baike/update",
            $scope.form
        ).success(function (response) {
            if (response.success) {
                $location.path("/baike");
            } else {
                bootbox.alert({
                        title: "更新失败",
                        message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "更新失败",
                    message: error
                }
            );
        });
    };

    $scope.delete_baike = function (id) {
        bootbox.confirm("确定删除吗?", function (confirmed) {
            if (confirmed) {
                $http.post(
                    config.host + "/api/admin/baike/delete?id=" + id
                ).success(function (response) {
                    if (response.success) {
                        $scope.go_to_page(1);
                    } else {
                        bootbox.alert({
                                title: "删除失败", message: response.message, closable: true
                            }
                        );
                    }
                }).error(function (error) {
                    bootbox.alert({
                            title: "删除失败", message: error, closable: true
                        }
                    );
                });
            }
        });

    };

    $scope.show_content = function (id) {
        $http.get(
            config.host + "/api/admin/baike/queryById?id=" + id
        ).success(function (response) {
            if (response.success) {
                console.log(response);
                bootbox.dialog({
                    title: "百科内容",
                    message: response.data.content,
                    show: true
                });

            } else {
                bootbox.alert({
                        title: "查询失败", message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "查询失败", message: error
                }
            );

        });
    };
    $scope.go_to_page = function (page) {
        if (!page) {
            page = 1;
        }
        $http.get(
            config.host + "/api/admin/baike",
            {'params': {'page': page, 'pageSize': 10}}
        ).success(function (response) {
            $scope.result.data = response.data;
        }).error(function (error) {
            console.log(error);
        });
    };
    $scope.go_to_page(1);
    if ($routeParams.id) {
        $scope.get_baike($routeParams.id);
    }
}]);

jlApp.controller('journalController', ['$scope', '$http', '$route', '$location', '$routeParams', 'config', function ($scope, $http, $route, $location, $routeParams, config) {
    $scope.buildings = [];
    $scope.form = {procedure: 'PREPARE'};
    $scope.result = {
        data: {
            page: 0,
            pageSize: 10,
            items: []
        }
    };

    $scope.get_buildings = function () {
        $http.get(
            config.host + "/api/admin/building",
            {'params': {'page': 1, 'pageSize': 100}}
        ).success(function (response) {
            $scope.buildings = response.data.items;
            console.log($scope.buildings);
        }).error(function (error) {
            console.log(error);
        });
    };
    $scope.get_journal = function (id) {
        $http.get(
            config.host + "/api/admin/journal/queryById?id=" + id
        ).success(function (response) {
            if (response.success) {
                console.log(response);
                $scope.form = {
                    staff: response.data.staff.name,
                    building:response.data.building.name,
                    cover:response.data.cover,
                    procedure:response.data.procedure,
                    content:response.data.content
                };
                var div = document.createElement('div');
                div.innerHTML = $scope.form.content;
                $('#journal-editor').summernote("insertNode", div);
            } else {
                bootbox.alert({
                        title: "查询失败", message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "查询失败", message: error
                }
            );

        });
    };
    $scope.add_journal = function () {
        var content = $('#journal-editor').summernote('code');
        $scope.form.content = content;
        $http.post(
            config.host + "/api/admin/journal",
            $scope.form
        ).success(function (response) {
            if (response.success) {
                $location.path("/journal");
            } else {
                bootbox.alert({
                        title: "添加失败",
                        message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "添加失败",
                    message: error
                }
            );
        });
    };
    $scope.update_journal = function () {
        var content = $('#journal-editor').summernote('code');
        $scope.form.content = content;
        console.log($scope.form);
        $http.post(
            config.host + "/api/admin/journal/update",
            $scope.form
        ).success(function (response) {
            if (response.success) {
                $location.path("/journal");
            } else {
                bootbox.alert({
                        title: "更新失败",
                        message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "更新失败",
                    message: error
                }
            );
        });
    };
    $scope.delete_journal = function (id) {
        bootbox.confirm("确定删除吗?", function (confirmed) {
            if (confirmed) {
                $http.post(
                    config.host + "/api/admin/journal/delete?id=" + id
                ).success(function (response) {
                    if (response.success) {
                        $scope.go_to_page(1);
                    } else {
                        bootbox.alert({
                                title: "删除失败", message: response.message, closable: true
                            }
                        );
                    }
                }).error(function (error) {
                    bootbox.alert({
                            title: "删除失败", message: error, closable: true
                        }
                    );
                });
            }
        });

    };
    $scope.show_content = function (id) {
        $http.get(
            config.host + "/api/admin/journal/queryById?id=" + id
        ).success(function (response) {
            if (response.success) {
                console.log(response);
                bootbox.dialog({
                    title: "监理日志内容",
                    message: response.data.content,
                    show: true
                });

            } else {
                bootbox.alert({
                        title: "查询失败", message: response.message
                    }
                );
            }
        }).error(function (error) {
            bootbox.alert({
                    title: "查询失败", message: error
                }
            );

        });
    };
    $scope.go_to_page = function (page) {
        if (!page) {
            page = 1;
        }
        $http.get(
            config.host + "/api/admin/journal",
            {'params': {'page': page, 'pageSize': 10}}
        ).success(function (response) {
            $scope.result.data = response.data;
        }).error(function (error) {
            console.log(error);
        });
    };
    $scope.go_to_page(1);
    if ($routeParams.id) {
        $scope.get_journal($routeParams.id);
    }
    if ($route.current.$$route.originalPath.indexOf("form") != -1) {
        $scope.get_buildings();
    }

}]);
