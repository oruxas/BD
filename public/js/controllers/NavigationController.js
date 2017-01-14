angular.module('NavigationController', [])
  .controller('NavigationController', ['$scope','$location','authentication', 'PassUserInfo',  
              function($scope, $location, authentication, PassUserInfo){
    var vm = this;
    
    vm.isLoggedIn = authentication.isLoggedIn();

    
    //alert(vm.currentUser);
    
     vm.currentUser = authentication.currentUser();
 
     if(angular.isDefined(vm.currentUser)){
       if(vm.currentUser.role =="admin"){
        $location.path('/admin');
      } else if(vm.currentUser.role == "guest" && vm.isLoggedIn){
        $location.path('profile');
      } else {
        $location.path('/');
      }
    } else {
      $location.path('/');
    }

     


   
   
      PassUserInfo.addUserInfo(vm.currentUser);

      
   
}]);
