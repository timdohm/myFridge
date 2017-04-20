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

.controller('DashCtrl', function($scope, $ionicModal, $ionicLoading, APIController) {
  $scope.searchtext = "";



  $scope.itemInput = {
    item: "",
    expDate: ""
  }
  $scope.listOfGroceries = {}; // Create list of people dictionary variable on controller $scope

  $scope.diffName = function() {

    console.log($scope.searchtext);

    var query = $scope.searchtext;
    var result = APIController.getAutocompleteIngredientSearch(query);
    //Function call returns a promise
    result.then(function(success){
      //success case
      //getting context of response
      console.log(success.getContext());
    },function(err){
      //failure case
    });

  };

  $scope.onSubmit = function () {

    var groceryItem = {};

    groceryItem.id = $scope.itemInput.item+$scope.itemInput.expDate;

    groceryItem.item = $scope.itemInput.item;
    groceryItem.expDate = $scope.itemInput.expDate;

    $scope.listOfGroceries[groceryItem.id] = groceryItem;


    $ionicLoading.show({ template: 'Item Added!', noBackdrop: true, duration: 1000 });
  };

  $scope.deleteItem = function(groceryItem) {

    delete $scope.listOfGroceries[groceryItem.id];

    $ionicLoading.show({ template: 'Item Deleted!', noBackdrop: true, duration: 1000 });
  };

})

.controller('HomeCtrl', function($scope, $state, $rootScope, $ionicHistory, $firebaseAuth, firebase) {

  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {

    if(localStorage.getItem('login') == null){
      $state.go('login', {});
    }
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $scope.name = localStorage.getItem('user');

    $scope.auth_token = localStorage.getItem('fbAccessToken');
    var auth = $firebaseAuth();

    if($scope.auth_token == null ) {
      $state.go('login', {});
    }
    else {
      var credential = firebase.auth.FacebookAuthProvider.credential(
        // `event` come from the Facebook SDK's auth.authResponseChange() callback
        $scope.auth_token
      );

      console.log(credential);
      auth.$signInWithCredential(credential).then(function(firebaseUser) {
        console.log("Signed in as:", firebaseUser.uid);
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    }


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

.controller('RecipesCtrl', function($scope, APIController, FindByIngredientsModel) {

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

  $scope.goHome = function() {
    $state.go("tab.home");
  }

});


