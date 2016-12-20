'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
    ['$rootScope', '$state', '$stateParams', '$templateCache',
      function ($rootScope, $state, $stateParams, $templateCache) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
      }
    ]
    )
    .config(
    ['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('/access/signin'); 
                $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'tpl/app.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['js/controllers/header.js']);
                        }]
                    }
                })
                
                .state('app.user', {
                    url: '/user',
                    templateUrl: 'app/user/user.html',
                    resolve: {deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('toaster').then(
                                    function () {
                                        return $ocLazyLoad.load(['js/controllers/toaster.js',
                                            'app/user/user.js']);
                                    });}]
                    }
                })
////////////////////////////////////////////////////////////////////////////////////////
                .state('app.master', {
                    url: "/master",
                    template: '<div ui-view></div>',
                    resolve: {
                        deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('toaster').then(
                                function () {
                                    return $ocLazyLoad.load(['app/master/master.js']);
                                });}]
                    }
                })
                .state('app.master.tocheck', {
                    url: '/tocheck',
                    templateUrl: 'app/master/master.tocheck.html'
                })
                .state('app.master.all', {
                    url: '/all',
                    templateUrl: 'app/master/master.all.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('toaster');
                            }]}
                })
////////////////////////////////////////////////////////////////////////////////////////
                .state('app.service', {
                    url: '/service',
                    template: '<div ui-view></div>',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('toaster').then(
                                function () {
                                    return $ocLazyLoad.load(['app/service/service.js'])
                                }
                            );}]}
                })
                .state('app.service.all', {
                    url: '/all',
                    params: {'id': null},
                    templateUrl: 'app/service/service.html',
                })
                .state('app.service.check', {
                    url: '/check',
                    templateUrl: 'app/service/service.check.html',
                })

//////////////////////////////////////////////////////////////////////////////////////////////
                .state('app.order', {
                        url: '/order',
                        templateUrl: 'app/order/order.html',
                        params: {'id': null},
                        resolve: {deps: ['$ocLazyLoad',
                                 function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load('app/order/order.js');
                                        }
                                    );
                        }]}
                })
//////////////////////////////////////////////////////////////////////////////////////////////
                .state('app.ask', {
                        url: '/ask',
                        templateUrl: 'app/ask/ask.html',
                        params: {'id': null},
                        resolve: {deps: ['$ocLazyLoad',
                                 function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load('app/ask/ask.js');
                                        }
                                    );
                        }]}
                })
//////////////////////////////////////////////////////////////////////////////////////////////
                .state('app.classify', {
                        url: '/classify',
                        templateUrl: 'app/classify/classify.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['app/classify/classify.js']);
                            }]
                        }
                })
//////////////////////////////////////////////////////////////////////////////////////////////
                .state('app.banner', {
                        url: '/banner',
                        templateUrl: 'app/banner/banner.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['app/banner/banner.js']);
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
