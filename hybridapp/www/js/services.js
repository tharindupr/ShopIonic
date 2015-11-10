var storeApi="http://54.179.157.173:8080";
angular.module('mobile.services', ['ngResource'])


.factory('User', function($q,$http) {

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


      return{isThere:isThere,create:create,initialize:initialize,buy:buy,updateFriends:updateFriends,friendsItems:friendsItems}
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

});
