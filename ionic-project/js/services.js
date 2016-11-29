/**
 * Created by chris on 2016/11/23.
 */
angular.module('myapp.service', ['ngResource'])
.factory('HotFactory', function ($rootScope, $resource, G) {

    var resource = $resource(G.api, {}, {
        query:{
            method: 'get',
            timeout: 20000
        }
    });

    var hotsData = {};

    return {
        getHots: function (cid) {
            //发起http get请求, 异步请求
            resource.query({
                a: 'getPortalList',
                catid: cid,
                page: 1
            }, function (r) {
                hotsData = r.result;
                // console.log(hotsData);
                $rootScope.$broadcast('updateHots');
            })
        },
        getHotsData: function () {
            return hotsData;
        }
    }
})
.factory('HotsDetailFactory', function ($rootScope, $resource, G) {
    var resource = $resource(G.api, {}, {
        query:{
            method: 'get',
            timeout: 20000
        }
    });

    var hotsDetailData = {};

    return {
        getHotsDetail: function (aid) {
            resource.query({
                a: 'getPortalArticle',
                aid: aid
            }, function (r) {
                // console.log(r.result[0]);
                hotsDetailData = r.result[0];
                $rootScope.$broadcast('updateHotsDetail');
            })
        },
        getHotsDetailData: function () {
            return hotsDetailData;
        }
    }
})
.factory('UserFactory', function ($rootScope, $resource, G) {

    //http://www.phonegap100.com/appapi.php?a=login2
    var resource = $resource(G.api + '?a=login2');
    var user;
    return {
        login: function (username, password) {
            resource.save({   //POST请求
                username: username,
                password: password
            }, function (r) {
                console.log(r);
                user = r.result;
                $rootScope.$broadcast('User.loginUpdate');
            })
        },
        getUser: function () {
            return user;
        }
    }

})
    .factory('Storage', function () {
        return {
            set: function (key, data) {
                return window.localStorage.setItem(key, window.JSON.stringify(data));
            },
            get: function (key) {
                return window.JSON.parse(window.localStorage.getItem(key))
            },
            remove: function (key) {
                return window.localStorage.removeItem(key);
            }
        }
    })













