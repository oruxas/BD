angular.module('NavigationController', [])
  .controller('NavigationController', ['$scope','$location','authentication', 'PassUserInfo',  
              function($scope, $location, authentication, PassUserInfo){
    var vm = this;
    
    vm.isLoggedIn = authentication.isLoggedIn();

    
    //alert(vm.currentUser);
    
     vm.currentUser = authentication.currentUser();
 
     


   
   
      PassUserInfo.addUserInfo(vm.currentUser);

      
   
}]);
