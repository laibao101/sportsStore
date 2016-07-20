angular.module("sportsStore")
.controller("productListCtrl",function ($scope,$filter,productListActiveClass,productListPageCount,cart) {
    var selectedCategory=null;
    $scope.selectCategory=function (newCategory) {
        selectedCategory=newCategory;
        $scope.selectedPage=1;
    }
    $scope.categoryFilterFn=function (product) {
        return selectedCategory == null || product.category==selectedCategory;
    }

    $scope.getCategoryClass=function (category) {
        return selectedCategory==category? productListActiveClass:"";
    }

    $scope.selectedPage=1;                  //初始化显示页数为第一页

    $scope.pageSize=productListPageCount;    //将定义的3一页只显示三个，初始化给pageSize

    $scope.selectPage=function (newPage) {    //传进来的是$index+1，设置当前是第几页
        $scope.selectedPage=newPage;
    }

    $scope.getPageClass=function (page) {     //获取当前页数
        return $scope.selectedPage==page? productListActiveClass : "";
    }

    $scope.addProductToCart=function (product) {
        cart.addProduct(product.id,product.name,product.price);
    }

})
.constant("productListActiveClass","btn-primary")
.constant("productListPageCount",3)   //初始化一页只显示3个