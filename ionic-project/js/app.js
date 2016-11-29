/**
 * Created by chris on 2016/11/23.
 */
angular.module('myapp', ['ionic', 'myapp.controller', 'myapp.config', 'myapp.service'])
.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('tab.home', {
            url: '/home',
            views: {
                'tab-home': {
                    templateUrl: 'templates/home/home.html',
                    controller: 'HomeController'
                }
            }
        })
        .state('tab.ho', {
            url: '/hots',
            views: {
                'tab-hots': {
                    templateUrl: 'templates/hots/hots.html',
                    controller: 'HotsController'
                }
            }
        })
        .state('tab.hotsDetail', {
            url: '/hotsDetail/:aid',
            views: {
                'tab-hots': {
                    templateUrl: 'templates/hots/hotsDetail.html',
                    controller: 'HotsDetailController'
                }
            }
        })
        .state('tab.ariticle', {
            url: '/ariticle',
            views: {
                'tab-ariticle': {
                    templateUrl: 'templates/ariticle/ariticle.html',
                    controller: 'AriticleController'
                }
            }
        })
        .state('tab.mine', {
            url: '/mine',
            views: {
                'tab-mine': {
                    templateUrl: 'templates/mine/mine.html',
                    controller: 'MineController'
                }
            }
        })
        .state('tab.login', {
            url: '/login',
            views: {
                'tab-mine': {
                    templateUrl: 'templates/mine/login.html',
                    controller: 'LoginController'
                }
            }
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');  //根据url跳转, href也是根据url

})