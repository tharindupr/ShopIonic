var requestToken = "";
var accessToken = "";
var clientId = "234756189512-9jqag1kj4034ftpreq46aeda29avgcp0.apps.googleusercontent.com";
var clientSecret = "0BxGwTi_WPx2II0o78f_jkBH";
var loginfrom="";

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
$http.get('https://graph.facebook.com/me?access_token='+requestToken).then(function(resp) {
               
      $scope.name=resp.data.name;            
                    
                    
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

}
})

.controller('SocialModuleCtrl1', function($scope,$http) {

  $scope.json=[{src:"img/slide1.png"},{src:"img/slide2.png"},{src:"img/slide3.png"}];
  //$scope.json=JSON.parse("[{'id':'1', 'src':'img/slide1.png'},{'id':'2', 'src':'img/slide2.png'},{'id':'3', 'src':'img/slide3.png'}]");
 

})


.controller('SocialModuleCtrl2', function($scope, $timeout,$stateParams,$http) {

  $scope.json=[{src:"img/headphone.jpg"},{src:"img/headphone1.jpg"},{src:"img/headphone2.jpg"},{src:"img/headphone1.jpg"}];
  //$scope.json=JSON.parse("[{'id':'1', 'src':'img/slide1.png'},{'id':'2', 'src':'img/slide2.png'},{'id':'3', 'src':'img/slide3.png'}]");





//alert(requestToken);
})

.controller('SocialModuleCtrl3', function($scope, $timeout,$stateParams) {

  $scope.json=[{src:"img/headphone.jpg"},{src:"img/headphone1.jpg"},{src:"img/headphone2.jpg"},{src:"img/headphone1.jpg"}];
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
        $cordovaOauth.facebook("1679199088960955", ["email", "public_profile"]).then(function(result) {
            //$localStorage.accessToken = result.access_token;
             requestToken=result.access_token;
             loginfrom="facebook";
             alert(requestToken);
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
});
