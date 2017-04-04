angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

  // var time = new Date().getTime();

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

})

.controller('ChatsCtrl', function($scope, Chats) {

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  }


  // FB.login(function(response) {
  //   if (response.authResponse) {
  //     console.log('Welcome!  Fetching your information.... ');
  //     FB.api('/me', function(response) {
  //       console.log('Good to see you, ' + response.name + '.');
  //     });
  //   } else {
  //     console.log('User cancelled login or did not fully authorize.');
  //   }
  // });

  // FB.login(function(response) {
  //   // handle the response
  // }, {
  //   scope: 'publish_actions',
  //   return_scopes: true
  // });

});
