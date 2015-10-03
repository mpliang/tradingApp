app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: '../pages/login.html',
      controller: 'loginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: '../pages/register.html',
      controller: 'registerCtrl'
    })
    .state('manage', {
      url: '/manage',
      templateUrl: '../pages/manage.html',
      controller: 'manageCtrl'
    })
    .state('manageProp', {
      url: '/manage/:propertyId',
      templateUrl: '../pages/manageProp.html',
      controller: 'propCtrl'
    })

});
