var requestToken = "CAACEdEose0cBAClk0cQAVqtqxPEcx6faviYWUL46lhoWHUgAuGJ63Oirb5mNjUpS56e3jVy0hXYQIiePqreZAaI8BZCZBFqXO2ZA8WdfkFZCSgG3ch31wi3KSZA31B6HiYASsoNuArZAdO6h22bgHUHeXo5vdCywrltJtyfWFkDxKCWHJbmw7w4oM2Ch23bwx8KCCjPguaV5wZDZD"
var accessToken = "";
var clientId = "234756189512-9jqag1kj4034ftpreq46aeda29avgcp0.apps.googleusercontent.com";
var clientSecret = "0BxGwTi_WPx2II0o78f_jkBH";
var loginfrom="";
var userid="";
angular.module('mobile.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicHistory,$http) {
  function ContentController($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
}
$scope.name="";
$scope.img="";
$scope.email="";

if(loginfrom=="google"){
 $http.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+requestToken).then(function(resp) {
    alert(JSON.stringify(resp));
  
    
    $scope.img=resp.data.picture;
    $scope.email=resp.data.email;

  
    // For JSON responses, resp.data contains the result
  }, function(err) {
     alert(JSON.stringify(err));
    // err.status will contain the status code
});
}

else if(loginfrom="facebook")
{
//getting the user name and photo from facebook
$http.get('https://graph.facebook.com/me?access_token='+requestToken).then(function(resp) {   
               
      $scope.name=resp.data.name;            
      userid=resp.data.id; 

      $http.get('http://54.179.157.173:8080/api/isthere/'+userid).then(function(resp){

             console.log(resp.data.length);  
             if(resp.data.length>0){
                      $http({
                          method: 'POST',
                          url: 'http://54.179.157.173:8080/api/create',
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                          transformRequest: function(obj) {
                              var str = [];
                              for(var p in obj)
                              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                              return str.join("&");
                          },
                          data: {token: requestToken }
                      }).success(function (res,status) {

                        alert(JSON.stringify(res));
                      });


             }  

      } ,function(err){console.log(err)});           
                    
                      // For JSON responses, resp.data contains the result
}, function(err) {
    alert(JSON.stringify(err));
                      // err.status will contain the status code
});


$http.get('https://graph.facebook.com/me/picture?redirect=0&access_token='+requestToken).then(function(resp) {
    $scope.img=resp.data.data.url;               
                    
                    
                    
                      // For JSON responses, resp.data contains the result
}, function(err) {
    alert(JSON.stringify(err));
                      // err.status will contain the status code
});


$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
});

}



/*

$http({
    method: 'POST',
    url: 'http://54.179.157.173:8080/api/user',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {token: requestToken }
}).success(function (res,status) {

  alert(JSON.stringify(res));
});

*/


})


//----------------------------------------------------------------




.controller('SocialModuleCtrl1', function($scope,$http) {

  $scope.json=[{src:"img/slide1.png",id:123},{src:"img/slide2.png",id:124},{src:"img/slide3.png",id:125}];
  //$scope.json=JSON.parse("[{'id':'1', 'src':'img/slide1.png'},{'id':'2', 'src':'img/slide2.png'},{'id':'3', 'src':'img/slide3.png'}]");
 

})


.controller('SocialModuleCtrl2', function($scope, $timeout,$stateParams,$http) {

  $scope.json=[{src:"img/headphone.jpg",id:126},{src:"img/headphone1.jpg",id:127},{src:"img/headphone2.jpg",id:128},{src:"img/headphone1.jpg",id:129}];
  //$scope.json=JSON.parse("[{'id':'1', 'src':'img/slide1.png'},{'id':'2', 'src':'img/slide2.png'},{'id':'3', 'src':'img/slide3.png'}]");





//alert(requestToken);
})

.controller('SocialModuleCtrl3', function($scope, $timeout,$stateParams) {

  $scope.json=[{src:"img/headphone.jpg",id:131},{src:"img/headphone1.jpg",id:132},{src:"img/headphone2.jpg",id:134},{src:"img/headphone1.jpg",id:135}];
  //$scope.json=JSON.parse("[{'id':'1', 'src':'img/slide1.png'},{'id':'2', 'src':'img/slide2.png'},{'id':'3', 'src':'img/slide3.png'}]");

})

.controller("GoogleOauth", function($scope, $cordovaOauth,$state,$http) {
     
    $scope.googleLogin = function() {
      //alert("working");
        $cordovaOauth.google("234756189512-9jqag1kj4034ftpreq46aeda29avgcp0.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
            
            // $location.path("../app/home/social");
             requestToken=result.access_token;
             
              //alert(JSON.stringify(result));

             loginfrom="google";
            $state.go('app.home');

        }, function(error) {
            console.log(error);
        });
    }

    

})


.controller("FacebookOauth", function($scope, $cordovaOauth,$state, $location,$http) {

    $scope.facebookLogin = function() {
        $cordovaOauth.facebook("1679199088960955", ["email", "public_profile","user_likes"]).then(function(result) {
            //$localStorage.accessToken = result.access_token;
             requestToken=result.access_token;
             loginfrom="facebook";
             //alert(requestToken);
             $state.go('app.home');

             
           
           // $location.path("/profile");
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})



.controller('ItemCtrl', function($scope,$state,$stateParams,$ionicPopup,IsThere) {
  
  console.log($stateParams);


    $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Successfull',
       template: 'You bought the item'+$stateParams.id
     });
     alertPopup.then(function(res) {
       console.log('popuped');
     });
   };


  $scope.session = IsThere.get({id:4441624615381 });

});
