angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'LocalStorageModule'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
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


.config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('aptManager');

  $stateProvider

    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })
    // .state('tab.manager', {
    //   url: '/apts',
    //   views: {
    //     'tab-apts': {
    //       templateUrl: 'templates/tab-apartments.html',
    //       controller: 'aptCtrl'
    //     }
    //   }
    // })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
    .state('home', {
      url: '/index',
      views: {
        'tab-apts': {
          templateUrl: 'templates/index.html',
          controller: 'homeCtrl'
        }
      }
    })
    // .state('tab.properties', {
    //   url: '/properties',
    //   views: {
    //     'tab-properties': {
    //       templateUrl: 'templates/tab-properties.html',
    //       controller: 'propCtrl'
    //     }
    //   }
    // })
    .state('splash', {
      url: '/splash',
      templateUrl: 'templates/splash.html'
    })


  $urlRouterProvider.otherwise('/login');

});
