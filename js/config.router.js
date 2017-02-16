'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
    ['$rootScope', '$state', '$stateParams', '$templateCache',                //方便获得当前状态的方法，绑定到根作用域
      function ($rootScope, $state, $stateParams, $templateCache) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
      }
    ]
    )
    .config(
    ['$stateProvider', '$urlRouterProvider',           //配置文件和提供者进行对服务的配置
      function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('/access/signin'); //路由重定向$urlRouterProvider,使用的默认登录界面
                $stateProvider                        //使用第三方模块Angular-UI Router，不使用路由，而是使用状态
                .state('app', {            //状态配置，用于状态转换
                    abstract: true,
                    url: '/app',     //hash部分的URL
                    templateUrl: 'tpl/app.html',
                    resolve: {             //用来处理异步数据调用                 //一般路由跳转的界面都会对应各自的控制器
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/controllers/header.js']);
                        }]
                    }
                })
                
                .state('app.user', {             //Children Router
                    url: '/user',
                    templateUrl: 'tpl/app/user/user.html',
                    resolve: {deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('toaster').then(
                                    function () {
                                        return $ocLazyLoad.load(['js/controllers/toaster.js',
                                            'js/app/user/user.js']);
                                    });}]
                    }
                })
////////////////////////////////////////////////////////////////////////////////////////
                .state('app.talent', {
                    url: "/talent",
                    template: '<div ui-view></div>',
                    resolve: {
                        deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('toaster').then(
                                function () {
                                    return $ocLazyLoad.load(['js/app/talent/talent.js']);
                                });}]
                    }
                })
                .state('app.talent.tocheckList', {
                    url: '/tocheck',
                    templateUrl: 'tpl/app/talent/talent.tocheck.html'
                })
                .state('app.talent.all', {
                    url: '/all',
                    templateUrl: 'tpl/app/talent/talent.all.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('toaster');
                            }]}
                })
                .state('app.talent.infochange',{
                    url:'/infochange',
                    templateUrl:'tpl/app/talent/talent.infochange.html',
                    cache:'false',
                })
////////////////////////////////////////////////////////////////////////////////////////
                .state('app.course', {
                    url: '/course',
                    template: '<div ui-view></div>',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('toaster').then(
                                function () {
                                    return $ocLazyLoad.load(['js/app/course/course.js'])
                                }
                            );}]}
                })
                .state('app.course.all', {
                    url: '/all',
                    templateUrl: 'tpl/app/course/course.all.html',
                })
                .state('app.course.recommend', {
                    url: '/recommend',
                    templateUrl: 'tpl/app/course/course.recommend.html'
                })
                .state('app.course.experience', {
                    url: '/experience',
                    templateUrl: 'tpl/app/course/course.experience.html'
                })
                .state('app.course.normal', {
                    url: '/normal',
                    templateUrl: 'tpl/app/course/course.normal.html'
                })

//////////////////////////////////////////////////////////////////////////////////////////////
                .state('app.ordermng', {
                        url: '/ordermng',
                        templateUrl: 'tpl/app/order/ordermng.html',
                        resolve: {deps: ['$ocLazyLoad',
                                 function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load('js/app/ordermng/ordermng.js');
                                        }
                                    );
                        }]}
                })
//////////////////////////////////////////////////////////////////////////////////////////////
                .state('app.classification', {
                    url: '/classification',
                    template: '<div ui-view></div>'
                })
                .state('app.classification.list', {
                        url: '/list',
                        templateUrl: 'tpl/app/classification/classification.list.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['vendor/thirdparty/plupload-2.1.8/js/plupload.full.min.js',
                                        'js/app/classification/qiniu.js',
                                        'js/app/classification/classification.js']);
                            }]
                        }
                })
//////////////////////////////////////////////////////////////////////////////////////////////
                .state('app.banner', {
                        url: '/banner',
                        templateUrl: 'tpl/app/banner/banner.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/app/banner/banner.js']);
                            }]
                        }
                })
////////////////////////////////////////////////////////////////////////////////////////////                
                .state('access', {
                    url: '/access',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('access.signin', {
                    url: '/signin',
                    templateUrl: 'tpl/page_signin.html',
                    resolve: {
                        deps: ['uiLoad',
                    function (uiLoad) {
                                return uiLoad.load(['js/controllers/signin.js']);
                  }]
                    }
                })
                .state('access.signup', {
                    url: '/signup',
                    templateUrl: 'tpl/page_signup.html',
                    resolve: {
                        deps: ['uiLoad',
                    function (uiLoad) {
                                return uiLoad.load(['js/controllers/signup.js']);
                  }]
                    }
                })
                .state('access.forgotpwd', {
                    url: '/forgotpwd',
                    templateUrl: 'tpl/page_forgotpwd.html'
                })
                .state('access.404', {
                    url: '/404',
                    templateUrl: 'tpl/page_404.html'
                })

      }
    ]
);
