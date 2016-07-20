angular.module("sportsStore")
    // .controller("sportsStoreCtrl", function ($scope) {
    //     $scope.data = {
    //         products: [
    //             { name: "Product #1", description: "A product", category: "category #1", price: 100 },
    //             { name: "Product #2", description: "A product", category: "category #2", price: 110 },
    //             { name: "Product #3", description: "A product", category: "category #3", price: 210 },
    //             { name: "Product #4", description: "A product", category: "category #4", price: 202 },
    //         ]
    //     };
    // })
    .constant("dataUrl","http://localhost:5500/products")
    .constant("orderUrl","http://localhost:5500/orders")
    .controller("sportsStoreCtrl",function ($scope,$http,dataUrl,orderUrl,cart,$location) {
        $scope.data={};
        $http.get(dataUrl)
            .success(function (data) {
                $scope.data.products=data;
            })
            .error(function (error) {
                $scope.data.error=error;
            });
        $scope.sendOrder=function (shippingDetails) {
            var order=angular.copy(shippingDetails);
            console.log(order);
            order.products=cart.getProducts();
            $http.post(orderUrl,order)
                .success(function (data) {
                    $scope.data.orderId=data.id;
                    cart.getProducts().length=0;
                })
                .error(function (error) {
                    $scope.data.orderError=error;
                })
                .finally(function (params) {
                    $location.path("/complete");
                });
        }
    })