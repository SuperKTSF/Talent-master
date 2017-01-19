'use strict';
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state','$cookies', 
  function ($scope, $http, $state, $cookies) {
    $scope.user = {
                       //到目前为止还没有弄清楚这个和session有关的access_token到底从哪来
    };            //不知道为什么从服务的响应中会有phone和password
    $scope.authError = null;
    $scope.login = function () {
        $scope.authError = null;

        $http.post('api/login',
        {
          phone: $scope.user.phone, password: $scope.user.password
        })
        .then(function(response) {
            $cookies.user_token = response.data.access_token;        //在cookies中存储用户验证信息
            console.log(JSON.stringify(response, null, '  '));
            $state.go('app.user');           //根据状态配置文件进行页面的转换
        }, function(x) {
            if(x==null || x.data==null || x.data.reason==null){
                $scope.authError = "服务器错误，请联系管理员";
            }else{
                $scope.authError = x.data.reason;
            }
        });
    };
  }]);