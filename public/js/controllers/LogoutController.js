 angular.module('LogoutController', [])
  .controller('LogoutController', ['$scope', '$location', '$window', 'meanData', 'authentication', 
                                  function($scope, $location, $window, meanData, authentication){
   
          var vm = this;                          
    // meanData.deleteProfile();
     
      $location.path('/');
      authentication
        .logout();

        
        $window.location.reload();
      

  }]);
