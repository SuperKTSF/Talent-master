'use strict';

app.controller('HeaderController', ['$scope', '$http', '$state','$cookies', 
    function ($scope, $http, $state, $cookies) {
        $scope.adminImg = "img/a0.jpg";
        $scope.adminName = "管理员";
        $http({
          method: "get",
          url:  'api/manager',                                  //$scope.app.url + '/api/user',
          headers:{Access_token:$cookies.user_token}
        })
        .success(function (json) {
            $scope.adminImg = json.image;
            $scope.adminName = json.name;
        })
        .error(function () {
        });
    }
]);