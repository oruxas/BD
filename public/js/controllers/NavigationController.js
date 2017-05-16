angular.module('NavigationController', [])
  .controller('NavigationController', ['$scope','$location', 'authentication',
              function($scope, $location, authentication){
    var vm = this;
    
    vm.currentUser = authentication.currentUser();
     vm.isLoggedIn = authentication.isLoggedIn();
  
     if(angular.isDefined(vm.currentUser)){
       if(vm.currentUser.role =="admin"){
        //$location.path('/admin');
      } else if(vm.currentUser.role == "guest" && vm.isLoggedIn){
        $location.path('profile');
      } else {
        $location.path('/');
      }
    } else {
      $location.path('/');
    }
     //PassUserInfo.addUserInfo(vm.currentUser);

      
   
}]);
