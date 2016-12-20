/**
 * Created by SuperK on 2016/11/15.
 */

//现在目前的工作还有把这个页面改成angularjs语法的页面


app.controller('personalCtrl',function ($scope) {
    $scope.name="我是Superk";
    $scope.job="移动国家重点实验室通信工程专业";
    $scope.informations=[
        {inf:"生日",content:'07-23-1993'},
        {inf:'电话',content:'15751966835'},
        {inf:'学校',content:'东南大学'},
        {inf:'邮箱地址',content:'843620353@qq.com'},
        {inf:'兴趣爱好',content:'运动和电影'}];
    $scope.selfIntroduce="2011年考取江苏省河海大学通信工程专业，并在2015年以专业第一的成绩报送至东南大学移动国家重点实验室通信工程专业读研，导师是刘楠，研究方向是通信过程中的干扰对齐方案研究，我是一个能吃苦耐劳、勤奋刻苦、追求上进的男生，在平时的生活和学习中能严格要求自己，做事坚持不懈，有很强的责任心、耐心我相信态度可以改变一切，不管对待什么事情只要用心去做就一定会有收获，自己始终坚信一句话，也是我上学期间一直激励自己的一句话，那就是：努力一定会有回报，没有回报那是因为你的努力还不够！目前学习前端接近半年的时间，掌握的技能十分基础，包括基本的css，html，javascript以及相关库类和框架JQuery和AngularJS，服务器端掌握一些Java开发和servlet和JSP的应用，目前的学习计划是在掌握现有技术的基础上学习NodeJS和框架React，现阶段急需实践提高动手能力,目前比较麻烦的问题在于，我喜欢能够合理的安排自己的时间，不想太受拘束，所以说对于这个达人荟的项目，我非常希望去做，希望能从中学到我想到的东西。";
    $scope.awards=["第六届大学生节能减排社会实践与科技竞赛校二等奖","江苏省IT杯电子设计竞赛二等奖","江苏省高校第十届大学生物理及实验科技作品创新竞赛实物组三等奖","河海大学第十五届物联网学院部长风采大赛优秀部长"];
    $scope.project1={time:"2014-2016",projectName:"锂电池组电流均衡系统",projectContent:"项目简介：尽量不增加外部均流控制措施的情况下，结合均流与冗余技术得到具有高可靠性、输出功率可扩展、满足大功率负载、便于维护等特点的分布式电源系统；"};
    $scope.project2={time:"2013-2014",projectName:"磁性材料BH特征曲线测试装置的研制 ",projectContent:"项目简介：研制一台方便实用的B-H磁滞回线测试仪，并且使该仪器具有较高的精度。实验者通过示波器来观测磁芯材料的磁滞回线，从而方便迅速地了解磁性材料的磁性特征；"};
    jQuery(document).ready(function($) {
        $(".scroll").click(function(event){
            event.preventDefault();
            $('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
        });
    });

    $(document).ready(function() {

        var defaults = {
            containerID: 'toTop', // fading element id
            containerHoverID: 'toTopHover', // fading element hover id
            scrollSpeed: 1200,
            easingType: 'linear'
        };

        $().UItoTop({ easingType: 'easeOutQuart' });

    });

    $(document).ready(function () {
        $('#horizontalTab').easyResponsiveTabs({
            type: 'default', //Types: default, vertical, accordion
            width: 'auto', //auto or any width like 600px
            fit: true   // 100% fit in a container
        });
    });

});