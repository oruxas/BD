 angular.module('LogoutController', [])
  .controller('LogoutController', ['$scope', '$location', '$window', 'authentication',
                                  function($scope, $location, $window, authentication){
   
          var vm = this;                          
     
      $location.path('/');
      authentication
        .logout();

        
        $window.location.reload();
      

  }]);
