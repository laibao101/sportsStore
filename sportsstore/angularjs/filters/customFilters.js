angular.module("customFilters",[])
.filter("unique",function(){
    return function (data,propertyName) {
        if(angular.isArray(data)&&angular.isString(propertyName)){
            var results=[];
            var keys={};
            for(var i=0;i<data.length;i++){
                var val=data[i][propertyName];
                if(angular.isUndefined(keys[val])){
                    keys[val]=true;
                    results.push(val);
                }
            }
            return results;
        }else{
            return data;
        }
    }
})
.filter("range",function ($filter) {
    return function (data,page,size) {
        if(angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size) ){
            var start_index=(page-1)*size;
            if(data.length < start_index){
                return [];
            }else{
                return $filter("limitTo")(data.splice(start_index),size);
            }
        }else{
            return data;
        }
    }
})
.filter("pageCount",function(){
    return function(data,size){
        if(angular.isArray(data)){
            var result=[];
            var len=Math.ceil(data.length/size);  //这个size就是传进来的pageSize，初始化为3的，然后总数目除以3向上取整来获取总页数，并最终返回一个包含页数的数组.
            for(var i=0;i<len; i++){  
                result.push(i);
            }
            return result;
        }else{
            return data;
        }
    }
})