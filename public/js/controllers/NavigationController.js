angular.module('NavigationController', [])
  .controller('NavigationController', ['$scope','$location','authentication', 'PassUserInfo', 'meanData', 
              function($scope, $location, authentication, PassUserInfo, meanData){
    var vm = this;
    
    

    
    //alert(vm.currentUser);
  
     vm.currentUser = authentication.currentUser();
     //alert(JSON.stringify(vm.currentUser));
     vm.isLoggedIn = authentication.isLoggedIn();
  
  
    // alert(vm.isLoggedIn);
    //  if(angular.isDefined(vm.currentUser)){
    //    if(vm.currentUser.role =="admin"){
    //     $location.path('/admin');
    //   } else if(vm.currentUser.role == "guest" && vm.isLoggedIn){
    //     $location.path('profile');
    //   } else {
    //     $location.path('/');
    //   }
    // } else {
    //   $location.path('/');
    // }
      PassUserInfo.addUserInfo(vm.currentUser);

      
   
}]);
