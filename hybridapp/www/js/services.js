var storeApi="http://54.179.157.173:8080";
angular.module('mobile.services', ['ngResource'])


.factory('User', function($q,$http,$window,$state) {



      function login(token){
              
          
              $window.localStorage['key'] = token;
              $window.localStorage['flag'] = true;

      }

      function logout(){

               $window.localStorage['flag'] = false;
               $state.go('login')

      } 

      function isAuthenticated(){
              var q=$q.defer();
              q.resolve($window.localStorage['flag']);
              return(q.promise);
      }


      function isThere(id){
        var q=$q.defer();
        var data;
        $http.get(storeApi+'/api/user/isthere/'+id).then(function(resp) {
                  //console.log(resp);
                  q.resolve(resp.data);            
                                        // For JSON responses, resp.data contains the result
        }, function(err) {
                q.reject(err);
                                  // err.status will contain the status code
        });

        return q.promise;
      }


      function create(requestToken){

                      var q=$q.defer();
                      $http({
                          method: 'POST',
                          url: storeApi+'/api/user/create',
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                          transformRequest: function(obj) {
                              var str = [];
                              for(var p in obj)
                              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                              return str.join("&");
                          },
                          data: {token: requestToken }
                      }).success(function (res,status) {

                                q.resolve(res);
                      });
 
            return q.promise;

      }

      function initialize(requestToken){
              var q=$q.defer();
              $http({
                          method: 'POST',
                          url: storeApi+'/api/user/initialize',
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                          transformRequest: function(obj) {
                              var str = [];
                              for(var p in obj)
                              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                              return str.join("&");
                          },
                          data: {token: requestToken }
                      }).success(function (res,status) {
                        q.resolve(res);
                        //alert(JSON.stringify(res));
                      });

            return q.promise;

      }



      function buy(userid,productId,productName){

              var q=$q.defer();
              $http({
                          method: 'POST',
                          url: storeApi+'/api/user/buy/'+userid,
                          headers: {'Content-Type': 'application/json'},
                          data: [{productId:productId,productName:productName}]
                      }).success(function (res,status) {
                        q.resolve(res);
                        //alert(JSON.stringify(res));
                      });

              return q.promise;


      }

      function updateFriends(userid){

           var q=$q.defer();
              $http({
                          method: 'POST',
                          url: storeApi+'/api/user/loadfriends/'+userid,
                          headers: {'Content-Type': 'application/json'},
                      }).success(function (res,status) {
                        q.resolve(res);
                        //alert(JSON.stringify(res));
                      });

              return q.promise;


      }


      function friendsItems(userid){

              var q=$q.defer();
              $http({
                          method: 'GET',
                          url: storeApi+'/api/user/friendsitems/'+userid
                      }).success(function (res,status) {
                        q.resolve(res);
                        //alert(JSON.stringify(res));
                      });

              return q.promise;

      }


      return{isThere:isThere,create:create,initialize:initialize,buy:buy,updateFriends:updateFriends,friendsItems:friendsItems,login:login,
        isAuthenticated:isAuthenticated,logout:logout}
})


.factory('Facebook',function($q,$http){

  function getDetails(requestToken){
    var pr=$q.defer();  
    $http.get('https://graph.facebook.com/me?access_token='+requestToken).then(function(resp) {   
             
      pr.resolve(resp.data);             

      } ,function(err){
        pr.reject(err); 
        console.log(err)

      });           
                    
                      // For JSON responses, resp.data contains the result
    return pr.promise;

  }


  function getImage(requestToken){
    var pr=$q.defer(); 
    $http.get('https://graph.facebook.com/me/picture?redirect=0&access_token='+requestToken).then(function(resp) {
          //$scope.img=resp.data.data.url;  
          pr.resolve(resp.data.data.url);                             
                    
                      // For JSON responses, resp.data contains the result
      }, function(err) {
          pr.reject(err);
                            // err.status will contain the status code
      });

    return pr.promise;
  }

  return{getDetails:getDetails,getImage:getImage}

})


.factory('Product',function($q,$http){

  function getProducts(){
    var pr=$q.defer(); 
    $http.get(storeApi+'/api/product').then(function(resp) {
          //$scope.img=resp.data.data.url;  
          //console.log(resp);
          pr.resolve(resp.data);                             
                    
                      // For JSON responses, resp.data contains the result
      }, function(err) {
         // console.log(err);
          pr.reject(err);
                            // err.status will contain the status code
      });

    return pr.promise;
  }


  function getProduct(id){
    var pr=$q.defer(); 
    $http.get(storeApi+'/api/product/'+id).then(function(resp) {
          //$scope.img=resp.data.data.url;  
          //console.log(resp);
          pr.resolve(resp.data);                             
                    
                      // For JSON responses, resp.data contains the result
      }, function(err) {
         // console.log(err);
          pr.reject(err);
                            // err.status will contain the status code
      });

    return pr.promise;


  }

  return{getProducts:getProducts,getProduct:getProduct}


})


.factory('Featured',function($q,$http){

  function getFeaturedProducts(){
    var pr=$q.defer(); 
    $http.get(storeApi+'/api/featured').then(function(resp) {
          //$scope.img=resp.data.data.url;  
          //console.log(resp);
          pr.resolve(resp.data);                             
                    
                      // For JSON responses, resp.data contains the result
      }, function(err) {
         // console.log(err);
          pr.reject(err);
                            // err.status will contain the status code
      });

    return pr.promise;
  }


  function getFeaturedProduct(id){
    var pr=$q.defer(); 
    $http.get(storeApi+'/api/featured/'+id).then(function(resp) {
          //$scope.img=resp.data.data.url;  
          //console.log(resp);
          pr.resolve(resp.data);                             
                    
                      // For JSON responses, resp.data contains the result
      }, function(err) {
         // console.log(err);
          pr.reject(err);
                            // err.status will contain the status code
      });

    return pr.promise;


  }

  return{getFeaturedProducts:getFeaturedProducts,getFeaturedProduct:getFeaturedProduct}


});