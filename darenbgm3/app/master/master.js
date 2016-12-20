/**
 * 待审核
 */
app.controller('TalenttocheckCtrl', ["$scope", "$cookies", 'toaster', '$http',
    function ($scope, $cookies, toaster, $http) {

    var user_token = $cookies.user_token;
    var url = $scope.app.url;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.itemsPerPage = 20;
    $scope.totalItems = 300;
    $scope.status = "加载中";

    $scope.nameSearch = "";
    $scope.startTime = "";
    $scope.endTime = "";
    $scope.catas = [];
    $scope.images = [];//证书图片
    $scope.masters = [];

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
        params += "state=pending";
        params += "&cata_id=0";
        params += "&start_time=" + $scope.startTime;
        params += "&end_time=" + $scope.endTime;
        params += "&name=" + $scope.nameSearch;
        params += "&page=" + $scope.currentPage;
        $http({
                "method": "get",
                "url": "/",//url + "/v1.0/admin/masters?" + params,
                "headers": {
                    "access_token": user_token
                }
            }).success(function (json) {
                var datas = {"masters":[{"id": "0","image":"","name":"jj","sex":"male","phone":"11122223333",
                "time":"0000 00:00:00","state":"normal"}],
                "pagination": {"total_rows": 1, "capacity": 20, "page": 1, "total": 1}}
                $scope.masters = datas.masters;
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

    //查询分类列表
    $scope.getCatalogList = function () {
        $http({
            method: 'GET',
            url: url + '/v1.0/catalogs',
            headers: { 'access_token': user_token}
        })
        .success(function (data, status) {
            var length = data.catalogs.length;
            for (var i = 0; i < length; i++) {
                $scope.catas.push(data.catalogs[i]);
            }
            $scope.catalogs = data.catalogs;
            var all = {"id" : "0","name" : "全部","icon" : ""};
            $scope.catalogs.unshift(all);
        })
        .error(function (data, status, hedaers, config) {
        });
    }
    $scope.getCatalogList();

    //点击表格行事件
    $scope.changeInfoBtn = function(id){
        var masters = $scope.masters;
        var row = findCourse(masters, id);

        $("#info-change-id").val(row.id);
        $("#info-change-name").val(row.name);
        $("#info-change-tag").val(row.name);
        $("#info-change-cata_id").val(row.name);
        $("#info-change-want_cata").val(row.name);
        $("#info-change-resume").val(row.name);
        $("#info-change-glory").val(row.name);
        $("#info-change-state").val("normal");
        
        $("#infoChangePage").addClass("fadeInRight");
        $("#infoChangePage").removeClass("hide fadeOutRight"); 
        $("#infoChangePage").css("z-index","100");
    }

    //关闭信息修改界面
    $scope.closeInfoChangePage = function(){
        $("#infoChangePage").removeClass("fadeInRight");
        $("#infoChangePage").addClass("hide fadeOutRight");
        $("#infoChangePage").css("z-index","-1");
    }

    //保存修改的用户信息
    $scope.saveInfoChangePage = function(){
        if($("#info-change-cata_id").val() == null){
            alert("类型不能为空");
            return 0;
        }
        if($("#info-change-state").val() == null){
            alert("评判不能为空");
            return 0;
        }

        var data = {
            "tags": $("#info-change-tag").val(),
            "cata_id": $("#info-change-cata_id").val(),
            "resume": $("#info-change-resume").val(),
            "glory": $("#info-change-glory").val(),
            "state": $("#info-change-state").val()
        };
        
        $.ajax({
            "type": "put",
            "dataType": "json",
            "url": url + "/v1.0/admin/master/" + $("#info-change-id").val(),
            "data": JSON.stringify(data),
            "headers": {"access_token": user_token},
            "success": function (data, info) {
                if (data.state == "ok") {
                    alert("保存成功");
                    $scope.search(0);
                    $scope.closeInfoChangePage();
                } else {
                    toaster.pop("success", "保存失败!", "", 1500);
                }
            },
            "error": function(data){
                alert("保存失败");
            }
        });
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

    //私有函数，查对应id的所有信息
    function findCourse(datas, id){
        for(var i=0; i<datas.length; i++){
            if(id == datas[i].id){
                return datas[i];
            }
        }
    }

    //翻页
    $scope.paginationClick = function(){
        $scope.search(0);
    };
}]);


//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/* 已上架 and 已下架 and 被拒*/
app.controller('TalentCtrl', ["$scope", "$cookies", 'toaster', '$http','$state',
    function ($scope, $cookies, toaster, $http, $state) {

    var user_token = $cookies.user_token;
    var url = $scope.app.url;
    $scope.currentPage = 1;
    $scope.maxSize = 10;
    $scope.itemsPerPage = 20;
    $scope.totalItems = 300;
    $scope.status = "加载中";

    $scope.categorySelected = "0";
    $scope.stateSelected = "normal";
    $scope.sortSelected = "time";
    $scope.nameSearch = "";
    $scope.startTime = "";
    $scope.endTime = "";
    $scope.catas = [];
    $scope.catalogs;
    $scope.masters = [];

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
        params += "state=" + $scope.stateSelected;
        params += "&cata_id=" + $scope.categorySelected;
        params += "&start_time=" + $scope.startTime;
        params += "&end_time=" + $scope.endTime;
        params += "&name=" + $scope.nameSearch;
        params += "&page=" + $scope.currentPage;
        $http({
                "method": "get",
                "url": "/",//url + "/v1.0/admin/masters?" + params,
                "headers": {
                    "access_token": user_token
                }
            }).success(function (json) {
                var datas = {"masters": [{
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
                $scope.masters = datas.masters;
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

    //查询分类列表
    $scope.getCatalogList = function () {
        $http({
            method: 'GET',
            url: url + '/v1.0/catalogs',
            headers: { 'access_token': user_token}
        })
        .success(function (data, status) {
            var length = data.catalogs.length;
            for (var i = 0; i < length; i++) {
                $scope.catas.push(data.catalogs[i]);
            }
            $scope.catalogs = data.catalogs;
            var all = {"id" : "0","name" : "全部","icon" : ""};
            $scope.catalogs.unshift(all);
        })
        .error(function (data, status, hedaers, config) {
        });
    }
    $scope.getCatalogList();

    $scope.changeInfoBtn = function(id){
        var masters = $scope.masters;
        var master = findCourse(masters, id);
        $("#info-change-id").val(id);
        $("#info-change-name").val(master.name);
        

        $("#infoChangePage").addClass("fadeInRight");
        $("#infoChangePage").removeClass("hide fadeOutRight"); 
        $("#infoChangePage").css("z-index","100");
    }

    //跳转到订单页
    $scope.showMasterOders = function(id){
        $state.go('app.order', {'id': id});
    }
    //跳转到服务页
    $scope.showMasterServices = function(id){
        $state.go('app.service.all', {'id': id});
    }
    //跳转到问答页
    $scope.showMasterAsks = function(id){
        $state.go('app.ask', {'id': id});
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
            "tags": $("#info-change-tag").val(),
            "cata_id": $("#info-change-cata_id").val(),
            "resume": $("#info-change-resume").val(),
            "glory": $("#info-change-glory").val(),
            "state": $("#info-change-state").val()
        };
        
        $.ajax({
            "type": "put",
            "dataType": "json",
            "url": url + "/v1.0/admin/master/" + $("#info-change-id").val(),
            "data": JSON.stringify(data),
            "headers": {"access_token": user_token},
            "success": function (data, info) {
                if (data.state == "ok") {
                    alert("保存成功");
                    $scope.search(0);
                    $scope.closeInfoChangePage();
                } else {
                    toaster.pop("success", "保存失败!", "", 1500);
                }
            },
            "error": function(data){
                alert("保存失败");
            }
        });
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

    //私有函数，查对应id的所有信息
    function findCourse(datas, id){
        for(var i=0; i<datas.length; i++){
            if(id == datas[i].id){
                return datas[i];
            }
        }
    }

    //翻页
    $scope.paginationClick = function(){
        $scope.search(0);
    };
}]);
