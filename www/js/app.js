
var mobile=angular.module('mobile', ['ionic', 'mobile.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    //abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
    .state('app.item', {
      url: '/item/:item',
      views: {
        'menuContent': {
          templateUrl: 'templates/item.html',
          controller: 'ItemCtrl'
        }
      }
      
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
        
      }
    }
  })


  .state('app.home.catergory', {
    url: '/catergory',
    views: {
      'tab-category': {
        templateUrl: 'templates/categories.html',
        controller: 'CatCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
      
    
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});



