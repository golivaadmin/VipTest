/**
 * Created by goliva on 26-08-16.
 */
app.controller('SplashController', function($ionicHistory,$state) {

  var init_splash = function () {



    $ionicHistory.nextViewOptions({
      disableBack: true, disableAnimate: true,historyRoot:true
    });

    $state.go('login');
  };

  setTimeout(function(){
    init_splash();
  }, 2000);

});
