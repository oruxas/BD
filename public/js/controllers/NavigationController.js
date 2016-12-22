angular.module('NavigationController', [])
  .controller('NavigationController', ['$location','authentication', 'PassUserInfo', function($location, authentication, PassUserInfo){
  var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

   
      PassUserInfo.addUserInfo(vm.currentUser);
   
}]);
