/**
 * Created by chris on 2016/11/23.
 */
angular.module('myapp.controller', [])
.controller('HomeController', function ($scope, $ionicSlideBoxDelegate) {
    $scope.pageIndex = 1;
    $scope.onPagerClick = function (index) {
        console.log(index);
        $ionicSlideBoxDelegate.slide(index);
        $scope.pageIndex = index+1;
    }
    $scope.onSlideChanged = function (index) {
        console.log(index);
        $scope.pageIndex = index+1;
    }

}).controller('HotsController', function ($scope, HotFactory, G) {

    $scope.imgUrl = G.imgUrl;
    console.log('hots');
    $scope.$on('updateHots', function () {
        $scope.hotsData = HotFactory.getHotsData();
        console.log($scope.hotsData);
        //停止刷新
        // $scope.$broadcast("scoll.refreshComplete");
    });

    HotFactory.getHots(20);

    //副标题点击切换
    $scope.selectButton = function (catid, index) {
        var btns = $('.hots-button-bar .button');
        $.each(btns, function (idx, ele) {
            ele.className = 'button button-clear';
        });
        btns[index].className = 'button button-clear select_button';

        //获取副标题对应的数据
        HotFactory.getHots(catid);
    }
    //下拉刷新事件
    $scope.onRefresh = function () {
        //获取当前要刷新的页面的catid
        HotFactory.getHots(20);
    }

}).controller('HotsDetailController', function ($scope, $rootScope, HotsDetailFactory, $stateParams) {

    //隐藏tabs
    $rootScope.hideTabs = 'tabs-item-hide';
    //监听页面销毁
    $scope.$on('$destroy', function () {
        $rootScope.hideTabs = '';
    })

    console.log($stateParams.aid);
    $scope.showLoading = true;
    HotsDetailFactory.getHotsDetail($stateParams.aid);
    
    $scope.$on('updateHotsDetail', function () {
        $scope.hotsDetailData = HotsDetailFactory.getHotsDetailData();
        $scope.showLoading = false;
        // console.log($scope.hotsDetailData);
    });

})
.controller('AriticleController', function ($scope) {

    console.log('Ariticle');

}).controller('MineController', function ($scope, Storage) {

    console.log('mine');
    if (Storage.get('user')){
        $scope.userInfo = Storage.get('user');
    }

}).controller('LoginController', function ($scope, Storage, $ionicLoading, $state, UserFactory) {

    $scope.user = {
        username: '',
        password: ''
    }
    $scope.signIn = function () {
        UserFactory.login($scope.user.username, $scope.user.password);
        $scope.$on('User.loginUpdate', function () {
            var userRel = UserFactory.getUser();
            if (userRel.success == true){
                Storage.set('user', $scope.user);
                $state.go('tab.mine', {}, {reload: true});
            }else {
                $ionicLoading.show({
                    template: userRel.message,
                    duration: 1000
                });
            }
        })
    }

})