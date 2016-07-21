angular.module("sportsStoreAdmin")
    .constant("productUrl","http://localhost:5500/products/")
    .config(function ($httpProvider) {
        $httpProvider.defaults.widthCredentials=true;   //配置默认跨域
    })
    .controller("productCtrl",function($scope,$resource,productUrl){   //$recource是建立在$http的基础上面

        $scope.productsResource=$resource(productUrl + ":id",{id:"@id"});

        $scope.listProducts=function(){     //获取远程端的所有商品内容
            $scope.products=$scope.productsResource.query();
        }

        $scope.deleteProduct=function(product){    //删除当前行的内容
            product.$delete().then(function(){
                $scope.products.splice($scope.products.indexOf(product),1);   //在传递过来的products数组里面删除当前要删除的商品，以改变view
            })
        }

        $scope.createProduct=function(product){  //将填写好的内容，放进resouce里面，里面不含有id。发送到后端.
            new $scope.productsResource(product).$save().then(function(newProduct){   //new一个resource服务出来。发送给后端之后，会返回一个数据给newProduct对象,这个对象在发送过去对象的基础上添加了一个id属性，服务端添加的。
                console.log(newProduct)
                $scope.products.push(newProduct);
                $scope.editedProduct=null;
            })
        }

        $scope.updateProduct=function(product){  //当点击edit按钮之后，editedProduct对象就有了内容，当前行会隐藏，并且最下面会显示这个对象的内容，而且create按钮会消失。出现save和cancel按钮
            product.$save();         //发送post请求，将内容发送给后端
            $scope.editedProduct=null;
        }

        $scope.startEdit=function(product){   //点击edit按钮之后，会将当前商品的所有属性传递给editedProduct这个对象。
            $scope.editedProduct=product;
        }

        $scope.cancelEdit=function(){   //点击cancal按钮，将editedProduct对象设置为空对象，这个对象在原来地方就会显示，最下面的编辑区域也会被清空，回复到正常情况
            $scope.editedProduct=null;
        }

        $scope.listProducts(); ///立即调用，因为访问对象没有自动从服务器载入数据。
    })