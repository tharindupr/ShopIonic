var requestToken = "";
var accessToken = "";
var clientId = "234756189512-9jqag1kj4034ftpreq46aeda29avgcp0.apps.googleusercontent.com";
var clientSecret = "0BxGwTi_WPx2II0o78f_jkBH";


angular.module('mobile.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicHistory) {



})


.controller('ItemCtrl', function($scope, $timeout,$stateParams) {

  $scope.as=12;
  console.log($scope.bool);

})

.controller('CatCtrl', function($scope) {
  $scope.groups = [];
  for (var i=0; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: []
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
  
})



.controller('SocialModuleCtrl1', function($scope,$http) {

  $scope.json=[{src:"img/slide1.PNG"},{src:"img/slide2.PNG"},{src:"img/slide3.PNG"},{src:"img/slide3.PNG"}];
  //$scope.json=JSON.parse("[{'id':'1', 'src':'img/slide1.png'},{'id':'2', 'src':'img/slide2.png'},{'id':'3', 'src':'img/slide3.png'}]");
  

})



.controller('SocialModuleCtrl2', function($scope, $timeout,$stateParams,$http) {

  $scope.json=[{src:"img/headphone.jpg"},{src:"img/headphone1.jpg"},{src:"img/headphone2.jpg"},{src:"img/headphone1.jpg"}];
  //$scope.json=JSON.parse("[{'id':'1', 'src':'img/slide1.png'},{'id':'2', 'src':'img/slide2.png'},{'id':'3', 'src':'img/slide3.png'}]");

$http.get('http://hexmatter.cloudapp.net/post/').then(function(resp) {
      alert('Success', resp);
      // For JSON responses, resp.data contains the result
    }, function(err) {
      alert(JSON.stringify(err));
      // err.status will contain the status code
  });


})


.controller('SocialModuleCtrl3', function($scope, $timeout,$stateParams) {

  $scope.json=[{src:"img/headphone.jpg"},{src:"img/headphone1.jpg"},{src:"img/headphone2.jpg"},{src:"img/headphone1.jpg"}];
  //$scope.json=JSON.parse("[{'id':'1', 'src':'img/slide1.png'},{'id':'2', 'src':'img/slide2.png'},{'id':'3', 'src':'img/slide3.png'}]");

})




/*

.controller("GoogleOauth", function($scope, $cordovaOauth,$state,$http) {
     
    $scope.googleLogin = function() {
        $cordovaOauth.google("234756189512-9jqag1kj4034ftpreq46aeda29avgcp0.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
            
            // $location.path("../app/home/social");
              //alert(JSON.stringify(result));

             
            $state.go('app.home');

        }, function(error) {
            console.log(error);
        });
    }

    $scope.next=function(){
      alert('done');
      $state.go('app.home');
    }

});*/