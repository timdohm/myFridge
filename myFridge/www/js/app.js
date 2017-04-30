// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var myFridge = angular.module('myFridge', ['ionic', 'starter.controllers', 'starter.services', 'ngOpenFB', 'SpoonacularAPILib', 'firebase', 'ngOrderObjectBy'])

.run(function($ionicPlatform, ngFB) {
  ngFB.init({appId: '1862623484011160'});
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

myFridge.run(function($rootScope, $ionicHistory, $state, firebase, $firebaseAuth, $ionicPlatform) {

  var signIn = function() {
    var name = localStorage.getItem('user');
    var auth_token = localStorage.getItem('fbAccessToken');
    var auth = $firebaseAuth();

    console.log(auth_token)

    if(auth_token == null ) {
      console.log("going to state.go without completion")
      $state.go('login', {

      });
    }
    else {
      var credential = firebase.auth.FacebookAuthProvider.credential(
        // `event` come from the Facebook SDK's auth.authResponseChange() callback
        auth_token
      );
      $rootScope.startLogin();

      console.log(credential);
      auth.$signInWithCredential(credential).then(function(firebaseUser) {
        $rootScope.currentUser = firebaseUser
        $rootScope.loginFinished()
        console.log("Signed in as:", firebaseUser.uid);
      }).catch(function(error) {
        console.error("Authentication failed:", error);
        $rootScope.loginFailed()
      });
    }
  }

  $rootScope.loginCompletionHandlers = []

  $rootScope.startLogin = function() {
    $rootScope.waitingForLogin = true
  }

  $rootScope.loginFinished = function() {
    $rootScope.waitingForLogin = false
    for (var i=0; i<$rootScope.loginCompletionHandlers.length; i++) {
      $rootScope.loginCompletionHandlers[i]()
    }
    $rootScope.loginCompletionHandlers = []
  }

  $rootScope.loginFailed = function() {
    $rootScope.waitingForLogin = false
    $rootScope.loginCompletionHandlers = []
  }

  $rootScope.runWhenLoggedIn = function(fn) {
    if ($rootScope.waitingForLogin) {
      $rootScope.loginCompletionHandlers.push(fn)
    } else {
      fn()
    }
  }

  $ionicPlatform.ready(function() {

    if(localStorage.getItem('login') == null){
      var params = {
        completion: signIn
      }
      console.log(params)
      $state.go('login', params);
    } else {
      signIn()
    }

  })
})

myFridge.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
      params: {
        completion: null,
        a: 0
      }
    })

    .state('tab.recipes', {
      url: '/recipes',
      views: {
        'tab-recipes': {
          templateUrl: 'templates/tab-recipes.html',
          controller: 'RecipesCtrl'
        }
      }
    })
    .state('recipeDisp', {
      url:'/recipeDisp',
      params: {
        recipe: 'recipe'
      },
      cache: false,
      templateUrl: 'templates/recipeDisp.html',
      controller: 'RecipeDispCtrl'

    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
