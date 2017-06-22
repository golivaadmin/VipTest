var app = angular.module('starter.controllers', []);
app.controller('AppCtrl', function($scope, $state,$ionicHistory) {

  $scope.global = global;

  $scope.go_to = function (dir) {
    $ionicHistory.nextViewOptions({
      disableBack: true, disableAnimate: true,historyRoot:true
    });

    $state.go(dir);
  }

});
