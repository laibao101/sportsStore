angular.module("sportsStoreAdmin")
    .constant("authUrl", "http://localhost:5500/users/login")
    .constant("ordersUrl", "http://localhost:5500/orders")
    .controller("authCtrl",function ($scope,$http,$location,authUrl) { //登录界面的控制器，使用跨域来请求远程数据.
        
        $scope.authenticate=function (user,pass) {
            $http.post(authUrl,{
                username:user,
                password:pass
            },{
                withCredentials:true
            }).success(function (data) {
                $location.path("/main");
            }).error(function (error) {
                $scope.authenticationError=error;
            });
        }
    })
    .controller("mainCtrl",function($scope){  //为了在同一个页面里面切换需要显示的页面
        $scope.screens=["Products","Orders"];
        $scope.current=$scope.screens[0];

        $scope.setScreen=function(index){
            $scope.current=$scope.screens[index];
        };

        $scope.getScreen=function(){
            return $scope.current=="Products" ? "/views/adminProducts.html" : "/views/adminOrders.html";
        }
    })
    .controller("ordersCtrl",function($scope,$http,ordersUrl){

        $http.get(ordersUrl,{withCredentials:true})   //同样需要跨域
            .success(function (data) {
                $scope.orders=data;     //获取到的数据挂载到orders上面
            })
            .error(function (error) {
                $scope.error=error;
            });
        
        $scope.selectedOrder;    //初始化一个选择了的变量，用于接下来存储要选择的内容

        $scope.selectOrder=function (order) {
            $scope.selectedOrder=order;
        }

        $scope.calcTotal=function (order) {    //计算总价
            var total=0;
            for(var i=0; i<order.products.length; i++){
                total+=order.products[i].count*order.products[i].price;
            }
            return total;
        }
    })