app.controller('userCtrl', ['$scope', '$http', 'toaster', '$cookies', '$state',
    function ($scope, $http, toaster, $cookies, $state) {

    var user_token = $cookies.user_token;
    var url = $scope.app.url;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.itemsPerPage = 20;
    $scope.totalItems = 300;
    $scope.status = "加载中";

    $scope.stateSelected = 'all';
    $scope.vocationSelected = 'all';
    $scope.startTime = "";
    $scope.endTime = "";
    $scope.nameSearch = "";
    $scope.users = [];

    //请求用户数据
    $scope.search = function (type) {
        //判断时间
        if(!startEndTimeRight($scope.startTime, $scope.endTime)){
            return 0;
        }
        //判断是否是搜索
        if(type == 1){
            $scope.currentPage = 1;
        }

        $scope.status = "加载中";
        var params = "";
        params += "authority=" + $scope.stateSelected;
        params += "&job=" + $scope.vocationSelected;
        params += "&start_time=" + $scope.startTime;
        params += "&end_time=" + $scope.endTime;
        params += "&name=" + $scope.nameSearch;
        params += "&page=" + $scope.currentPage;
        $http({
                "method": "get",
                "url": "/",//url + "/api/v3.0/admin/users?" + params,
                "headers": {
                    "access_token": user_token
                }
            }).success(function (json) {
                var datas = {"users": [{
                "id": 0, 
                "name": "fff", 
                "phone": "12312341234", 
                "image": "fff",  
                "sex": "male",
                "job": "student",
                "time": "2016-07-13 15:30:53", 
                "authority": "normal", 
                "balance": 10,
                "university": "东南大学",
                "school": "computer science",
                "grade": "大一",
                "year_in": "2012",
                "position": "项目经理",
                "company": "聪米科技"
                }], 
                "pagination": {"total_rows": 1, "capacity": 20, "page": 1, "total": 1}}
                $scope.users = datas.users;
                $scope.totalItems = datas.pagination.total_rows;
            })
            .error(function () {
                toaster.pop("warning", "加载出错!", "", 1500);
            });
    }
    $scope.search(0);

    //搜索框回车响应
    $scope.enterKeyPress = function(event){
        if(event.keyCode===13){
            $scope.search(1);
        }
    }

    $scope.changeInfoBtn = function(id){
        var users = $scope.users;
        var user = findCourse(users, id);
        $("#info-change-id").val(id);
        $("#info-change-name").val(user.name);
        $("#info-change-authority").val(user.authority);
        $("#info-change-job").val(user.job);
        $("#info-change-university").val(user.university);
        $("#info-change-school").val(user.school);
        $("#info-change-grade").val(user.grade);
        $("#info-change-year_in").val(user.year_in);
        $("#info-change-company").val(user.company);
        $("#info-change-position").val(user.position);

        $("#infoChangePage").addClass("fadeInRight");
        $("#infoChangePage").removeClass("hide fadeOutRight"); 
        $("#infoChangePage").css("z-index","100");
    }

    //跳转到订单页
    $scope.showUserOders = function(id){
        $state.go('app.order', {'id': id});
    }

    //关闭信息修改界面
    $scope.closeInfoChangePage = function(){
        $("#infoChangePage").removeClass("fadeInRight");
        $("#infoChangePage").addClass("hide fadeOutRight");
        $("#infoChangePage").css("z-index","-1");
    }

    //保存修改的用户信息
    $scope.saveInfoChangePage = function(){
        var data = {
            "authority": $("#info-change-authority").val()
        };
        
        $.ajax({
            "type": "put",
            "dataType": "json",
            "url": url + "/v1.0/admin/users/" + $("#info-change-id").val(),
            "data": JSON.stringify(data),
            "headers": {"access_token": user_token},
            "success": function (data, info) {
                if (data.state == "ok") {
                    toaster.pop("success", "保存成功!", "", 1500);
                    $scope.search(0);
                    $scope.closeInfoChangePage();
                } else {
                    toaster.pop("error", "保存失败!", "", 1500);
                    $scope.closeInfoChangePage();
                }
            },
            "error": function(data){
                toaster.pop("error", "保存失败!", "", 1500);
                $scope.closeInfoChangePage();
            }
        });
    }

    //私有函数，查对应id的所有信息
    function findCourse(datas, id){
        for(var i=0; i<datas.length; i++){
            if(id == datas[i].id){
                return datas[i];
            }
        }
    }

    //私有函数，判断时间是否正确
    function startEndTimeRight(start, end){
        if(start != "" && !isDateTime(start)){
            alert("起始时间格式错误");
            return false;
        }
        if(end != "" && !isDateTime(end)){
            alert("截止时间格式错误");
            return false;
        }
        if(end < start){
            alert("时间格式错误，起始时间大于截止时间");
            return false;
        }
        return true;
    }

    //私有函数，格式化时间
    function isDateTime(str){
        var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
        var r = str.match(reg); 
        if(r==null)return false;
        return true;
    }

    //翻页
    $scope.paginationClick = function(){
        $scope.search(0);
    };
}])