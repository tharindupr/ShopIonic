// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('mobile', ['ionic','mobile.controllers', 'mobile.services','ngCordova'])

.run(function($ionicPlatform,User,$rootScope,$state) {

  $rootScope.$on('$stateChangeStart',function(event,target){

     
        User.isAuthenticated().then(function (data){

            console.log(data);
            if(data===true && target.name==='login'){

                  $state.go('app.home.social');
            }

            else if(data===false && target.name!='login'){
                  
                  $state.go('login');

            }

        }); 
        
  });



  

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
 $ionicConfigProvider.tabs.position('bottom'); 
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
     .state('app', {
      url: '/app',
      //abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

     .state('login', {
      url: '/login',
      //abstract: true,
      templateUrl: 'templates/login.html',
      //controller: 'GoogleOauth'
    })


    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
       //   controller: 'HomeCtrl'
        }
      }
    })

    .state('app.home.social', {
        url: '/social',
        views: {
          'tab-social': {
            templateUrl: 'templates/social.html'
         //   controller: 'HomeCtrl'
          }
        }
      })
    .state('app.home.item', {
        url: '/item',
        views: {
          'tab-social': {
            templateUrl: 'templates/item.html'
         //   controller: 'HomeCtrl'
               }
           },
        params:{id:'00001'},
        controller:'ItemCtrl'
      });




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
