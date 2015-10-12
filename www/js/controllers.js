angular.module('mobile.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicHistory) {


 $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('ItemCtrl', function($scope, $ionicModal, $timeout,$stateParams) {

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



.controller('SocialModuleCtrl1', function($scope, $ionicModal, $timeout,$stateParams) {

  $scope.json=[{src:"img/slide1.PNG"},{src:"img/slide2.PNG"},{src:"img/slide3.PNG"},{src:"img/slide3.PNG"}];
  //$scope.json=JSON.parse("[{'id':'1', 'src':'img/slide1.png'},{'id':'2', 'src':'img/slide2.png'},{'id':'3', 'src':'img/slide3.png'}]");
})



.controller('SocialModuleCtrl2', function($scope, $ionicModal, $timeout,$stateParams) {

  $scope.json=[{src:"img/headphone.jpg"},{src:"img/headphone1.jpg"},{src:"img/headphone2.jpg"},{src:"img/headphone1.jpg"}];
  //$scope.json=JSON.parse("[{'id':'1', 'src':'img/slide1.png'},{'id':'2', 'src':'img/slide2.png'},{'id':'3', 'src':'img/slide3.png'}]");

})


.controller('SocialModuleCtrl3', function($scope, $ionicModal, $timeout,$stateParams) {

  $scope.json=[{src:"img/headphone.jpg"},{src:"img/headphone1.jpg"},{src:"img/headphone2.jpg"},{src:"img/headphone1.jpg"}];
  //$scope.json=JSON.parse("[{'id':'1', 'src':'img/slide1.png'},{'id':'2', 'src':'img/slide2.png'},{'id':'3', 'src':'img/slide3.png'}]");

});