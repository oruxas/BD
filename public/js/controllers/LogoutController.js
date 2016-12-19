 angular.module('LogoutController', [])
  .controller('LogoutController', ['$scope', '$location','meanData', 'authentication', function($scope, $location, meanData, authentication){
   

    // meanData.deleteProfile();
      $location.path('/');
      authentication
        .logout();
        
    
  }]);
