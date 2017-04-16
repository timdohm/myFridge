angular.module('starter.controllers', [])

  .controller('LoginCtrl', function ($scope, $ionicModal, $timeout, ngFB, $state, $rootScope) {



    $scope.fbLogin = function () {
      var runningInCordova = false;
      document.addEventListener("deviceready", function () {
        var runningInCordova = true;
      }, false);
      ngFB.login({scope: 'email,publish_actions'}).then(
        function (response) {
          if (response.status === 'connected') {
            localStorage.setItem('login', 'true');
            localStorage.setItem('fbAccessToken', response.authResponse.accessToken);

            ngFB.api({
              path: '/me',
              params: {fields: 'id,name'}
            }).then(
              function (user) {
                localStorage.setItem('user', user.name);
                $rootScope.userFBId = user.id;




                $state.go('tab.home');


          },

              function (error) {
                alert('Facebook error: ' + error.error_description);

              });


            console.log('Facebook login succeeded');
            if (runningInCordova) {
              $scope.closeLogin();
            }
          } else {
            alert('Facebook login failed');
          }
        });
    };
  })

.controller('DashCtrl', function($scope, $state, $rootScope, $ionicHistory, $ionicModal) {
  $scope.fridge = {};



})

.controller('HomeCtrl', function($scope, $state, $rootScope, $ionicHistory) {

  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {

    if(localStorage.getItem('login') == null){
      $state.go('login', {});
    }
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $scope.name = localStorage.getItem('user');
  });
  /*
  if(localStorage.getItem('user') == null) {
    location.reload();
  }*/
  //console.log(localStorage.getItem('user'));
  $scope.name = localStorage.getItem('user');
  var today = new Date()
  var curHr = today.getHours()

  $scope.curHr = curHr;

  if (curHr < 12) {
    $scope.curHr = 'breakfast!';
  } else if (curHr < 18) {
    $scope.curHr = 'lunch!';
  } else {
    $scope.curHr = 'dinner!';
  }

  var myIndex = 0;
  carousel();

  function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 5000); // Change image every 2 seconds
  }

})

.controller('AccountCtrl', function($scope, ngFB, $state, $ionicHistory, $ionicPopup, $ionicModal) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.cleanFridge = function() {
    //function for deleting fridge contents

  }

  $scope.goLogout = function() {

    var confirmPopup = $ionicPopup.confirm({
      title: 'Are You Sure to Quit?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        ngFB.logout().then(
          function (response) {
            console.log('Facebook logout succeeded');
            $scope.ignoreDirty = true; //Prevent loop
            localStorage.clear();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $state.go('login');
          });
      } else {
        console.log('You stay');
      }
    });
    //$ionicViewSwitcher.nextDirection('forward');
  };



});
