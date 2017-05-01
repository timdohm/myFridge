angular.module('starter.controllers', [])

  .controller('LoginCtrl', function ($scope, $ionicModal, $timeout, ngFB, $state, $rootScope, $stateParams) {
    console.log($stateParams);

    $scope.fbLogin = function () {
      console.log("fbstatus");
      console.log(ngFB.getLoginStatus());
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

                var completionHandler = $stateParams.completion
                if (completionHandler) {
                  console.log('completion handler called')
                  completionHandler()
                }

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

.controller('DashCtrl', function($scope, $ionicModal, $ionicLoading, APIController, firebase, $firebaseArray, $rootScope, $http) {

  $rootScope.runWhenLoggedIn(function() {
    var ref = firebase.database().ref('/items').orderByChild("uid").equalTo($rootScope.currentUser.uid);
    $scope.list = $firebaseArray(ref);



    $scope.list.$loaded()
      .then(function () {

    $scope.testFunc();

  });

  });


  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    if($scope.list != null) {
      $scope.list.$loaded()
        .then(function () {

          $scope.testFunc();

        });
    }
  });


  $scope.searchtext = "";
  $scope.itemInput = {
    item: "",
    expDate: ""
  }

  if($rootScope.sorting != null)
    $scope.sorting = $rootScope.sorting;
  else
    $scope.sorting = "";

  $scope.doSorting = function() {
    var elem_type = document.getElementById('sorting-select');
    var sort_type = elem_type.options[elem_type.selectedIndex].value;

    //console.log(sort_type);

    if (sort_type == "Exp Date") {
      $scope.sorting = "expDate";
    }
    else if (sort_type == "Ingredient Name") {
      $scope.sorting = "item";
      //console.log("here");
    }
    else {
      $scope.sorting = "";
    }
    $rootScope.sorting = $scope.sorting;
  };

  $scope.resultArr = null;

  $scope.diffName = function(query) {

    console.log(query);

    var result = APIController.getAutocompleteIngredientSearch(query);
    //Function call returns a promise
    result.then(function(success){
      //success case
      //getting context of response
      //console.log(success.getContext());
      $scope.resultArr = success.body;
      console.log($scope.resultArr);
    },function(err){
      //failure case
    });

  };

  $scope.onSubmit = function () {

    var groceryItem = {};

    groceryItem.id = $scope.itemInput.item+$scope.itemInput.expDate;

    groceryItem.item = $scope.itemInput.item;
    groceryItem.expDate = $scope.itemInput.expDate;

    // $scope.listOfGroceries[groceryItem.id] = groceryItem;
    $scope.list.$add({
      item: groceryItem.item,
      expDate: groceryItem.expDate,
      uid: $rootScope.currentUser.uid,
      color: ""

    })

      .then(function(ref) {
      var id = ref.key;
      console.log("added record with id " + id);
      console.log($scope.list.$indexFor(id));
    });

    $ionicLoading.show({ template: 'Item Added!', noBackdrop: true, duration: 1000});

    $scope.itemInput.item = null;
    $scope.itemInput.expDate = null;

    if($scope.list != null) {
      $scope.list.$loaded()
        .then(function () {

          $scope.testFunc();

        });
    }

  };

  $scope.deleteItem = function(groceryItem) {

    $scope.list.$remove($scope.list.indexOf(groceryItem));

    $ionicLoading.show({ template: 'Item Deleted!', noBackdrop: true, duration: 1000 });
  };

  $scope.todaysDate = new Date();
  $scope.dd = $scope.todaysDate.getDate();
  $scope.mm = $scope.todaysDate.getMonth() + 1;
  $scope.yyyy = $scope.todaysDate.getFullYear();

  $scope.todaysDate.getDate();

  if ($scope.dd < 10) {
    $scope.dd = '0' + $scope.dd;
  }
  if ($scope.mm < 10) {
    $scope.mm = '0' + $scope.mm;
  }
  $scope.todaysDate = $scope.yyyy + "-" + $scope.mm + "-" + $scope.dd;

  console.log($scope.todaysDate);

  $scope.testFunc = function() {

    for(var i = 0; i< $scope.list.length; i++) {

      if($scope.list[i].expDate < $scope.todaysDate) {
       console.log("expired!");
       $scope.list[i].color = "assertive";
       $scope.list.$save(i);
      }
    }
  }
})

.controller('HomeCtrl', function($scope, $state, $rootScope, $ionicHistory, $firebaseAuth, firebase, ngFB, $ionicLoading) {

  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    /*
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();*/
  });
  /*
  if(localStorage.getItem('user') == null) {
    location.reload();
  }*/
  //console.log(localStorage.getItem('user'));
  var status = ngFB.getLoginStatus();
  console.log(status);
  status.then(function(result) {
    if(result.status == "unknown") {
      localStorage.clear();
      $ionicLoading.show({ template: 'Please login', noBackdrop: true, duration: 1000 });
      $state.go('login');
    }
  });

  $scope.name = localStorage.getItem('user');
  var today = new Date();
  var curHr = today.getHours();

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

.controller('RecipesCtrl', function($scope, APIController, FindByIngredientsModel, $state, $stateParams, $ionicViewSwitcher, $rootScope, firebase, $firebaseArray) {
  $rootScope.runWhenLoggedIn(function() {
    var ref = firebase.database().ref('/items').orderByChild("uid").equalTo($rootScope.currentUser.uid);
    $scope.list = $firebaseArray(ref);
    $scope.list.$loaded().then(function () {

      $scope.ingredients = [];

      console.log($scope.ingredients);
    });
  });

  $scope.addItem = function(item) {

    console.log(item);

    console.log(item.checked);

    if(item.checked) {
      $scope.ingredients.push(item.item);
    }
    else {
      var index = $scope.ingredients.indexOf(item.item);
      $scope.ingredients.splice(index, 1);
     // console.log($scope.ingredients);
    }

    console.log($scope.ingredients);

  };

  $scope.goRecipe = function(recipe) {
    $ionicViewSwitcher.nextDirection('forward');
    $state.go('recipeDisp', {recipe: recipe});
  };
  $scope.submitRecipe = function() {
    var ingredients = $scope.ingredients;
    var limitLicense = true;
    var number = 131;
    var ranking = 131;

    // key-value map for optional query parameters
    var queryParameters = [];


    var result = APIController.findByIngredients(ingredients, limitLicense, number, ranking, queryParameters);
    //Function call returns a promise
    result.then(function(success){
      //success case
      //getting context of response
      console.log(success.getContext());
    },function(err){
      //failure case
    });
  }
})


.controller('RecipeDispCtrl', function($scope, $rootScope, firebase, $firebaseArray, $state, ngFB, $state, $stateParams, $ionicModal, $ionicHistory, APIController, FindByIngredientsModel){

  $rootScope.runWhenLoggedIn(function() {
    var ref = firebase.database().ref('/items').orderByChild("uid").equalTo($rootScope.currentUser.uid);
    $scope.list = $firebaseArray(ref);
  });

  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.recipe = APIController.getRecipeInformation($stateParams.recipe);

  result.then(function(success){
    //success case
    //getting context of response
    console.log(success.getContext());
  },function(err){
    //failure case
  });
})

.controller('AccountCtrl', function($scope, $rootScope, firebase, $firebaseArray, $ionicLoading, ngFB, $state, $ionicHistory, $ionicPopup, $ionicModal) {
  $rootScope.runWhenLoggedIn(function() {
    var ref = firebase.database().ref('/items').orderByChild("uid").equalTo($rootScope.currentUser.uid);
    $scope.list = $firebaseArray(ref);
  });

  $scope.settings = {
    enableFriends: true
  };

  $scope.goLogout = function() {

    var confirmPopup = $ionicPopup.confirm({
      title: 'Are You Sure You Want to Quit?'
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
  };

  $scope.clearFridge = function() {
    console.log($scope.list.length);
    for (var i = 0; i < $scope.list.length; i++) {
      $scope.list.$remove($scope.list.indexOf($scope.list[i]));
    }
    $ionicLoading.show({ template: 'Fridge cleared!', noBackdrop: true, duration: 1000 });
  };

  $scope.clearRecipes = function() {
    ionicLoading.show({ template: 'Recipes cleared!', noBackdrop: true, duration: 1000 });
  };


});
