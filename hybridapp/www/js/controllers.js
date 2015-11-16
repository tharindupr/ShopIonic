var requestToken = "CCAACEdEose0cBACOC4hZCSZAHZCpNQvQZAY9Wnfqqe4XrfTFTt3W1WZAg6Bb914U8IIlfAwqXcUVtt9BGqzuhGLq8732CJPMZBVUT3YqeJrUHsZBwthjhPskjRaNnN7qKbDHhYGiZC7xlwko12SSFgrSBGGB0lhgsafPra4DvmNA0yds7Xw7d8deVJxhvXNWMfZAV04ZBE8IgRTUwZDZD"
var accessToken = "";
var clientId = "234756189512-9jqag1kj4034ftpreq46aeda29avgcp0.apps.googleusercontent.com";
var clientSecret = "0BxGwTi_WPx2II0o78f_jkBH";
var loginfrom="";
var userid="";
angular.module('mobile.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicHistory,$http,Facebook,User,$window) {

function ContentController($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
}


$scope.logout=function(){

  User.logout();

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

User.initialize(requestToken).then(function(res){
    //getting the latest name and the profile picture from the facebook
    Facebook.getDetails(requestToken).then(function(data){
       $scope.name=data.name
        userid=data.id; 
        console.log(userid);
        //checking the user id is available in the mongo database
        User.isThere(userid).then(function(userinfo){
          if(userinfo.length<1){

            User.create(requestToken).then(function(res){
                       User.updateFriends(userid).then(function(code){
                                  //alert(JSON.stringify(code));
                                  User.friendsItems(userid).then(function(re){
                                                   // alert("Friends and Items Loaded");
                                });

                        });

                      console.log(res);
            });

          }
           
        });


        User.updateFriends(userid).then(function(code){
          //alert(JSON.stringify(code));
          User.friendsItems(userid).then(function(re){
                            alert("Friends and Items Loaded");
        });

        });
    /*    */


    });

    console.log(res);
})

//getting the user photo from facebook
Facebook.getImage(requestToken).then(function(url){
  $scope.img=url;
});




$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
});

}



})


//----------------------------------------------------------------




.controller('SocialModuleCtrl1', function($scope,$http,User) {

  $scope.json=[{src:"img/slide1.png",id:123},{src:"img/slide2.png",id:124},{src:"img/slide3.png",id:125}];
  //$scope.json=JSON.parse("[{'id':'1', 'src':'img/slide1.png'},{'id':'2', 'src':'img/slide2.png'},{'id':'3', 'src':'img/slide3.png'}]");
 

})


.controller('SocialModuleCtrl2', function($scope, $timeout,$stateParams,$http,Product) {

  Product.getProducts().then(function(res){

    $scope.json=res;
    
  });
 
})

.controller('SocialModuleCtrl3', function($scope, $timeout,$stateParams,Featured) {


  Featured.getFeaturedProducts().then(function(res){

      $scope.json=res;
      //console.log(res);
  });

   $scope.no=5;
   $scope.range = function(n) {
        return new Array(n);
  };

  //$scope.json=[{src:"img/headphone.jpg",id:131},{src:"img/headphone1.jpg",id:132},{src:"img/headphone2.jpg",id:134},{src:"img/headphone1.jpg",id:135}];
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


.controller("FacebookOauth", function($scope, $cordovaOauth,$state, $location,$http,User,$window) {
    $window.localStorage['flag'] = false;
    $scope.facebookLogin = function() {
        $cordovaOauth.facebook("1679199088960955", ["email", "user_about_me","user_birthday","user_friends","user_likes"]).then(function(result) {
            //$localStorage.accessToken = result.access_token;
             requestToken=result.access_token;
             loginfrom="facebook";
             User.login(requestToken);
             //alert(requestToken);
             //$window.localStorage['flag'] = true;
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



.controller('ItemCtrl', function($scope,$state,$stateParams,$ionicPopup,User,Product) {
  
 // console.log($stateParams);
  var productId=$stateParams.id;
  console.log(productId);
  Product.getProduct(productId).then(function(res){

      $scope.item=res[0];
      $scope.cover1=$scope.item.coverURLs[0].toLowerCase();
      $scope.cover2=$scope.item.coverURLs[1].toLowerCase();
      console.log($scope.cover1);

  });  
    

    

  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Successfull',
     template: 'You bought the item'+$stateParams.id
   });

      //alert(userid); 
      User.buy(userid,productId,"Beats headphone").then(function(msg){

        // alertPopup.then(function(res) {});
      });
  };

     
  
});
