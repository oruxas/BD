 angular.module('LogoutController', [])
  .controller('LogoutController', ['$scope', '$location','$route' ,'meanData', 'authentication', function($scope, $location, $route, meanData, authentication){
   

    // meanData.deleteProfile();
     
      $location.path('/');
      authentication
        .logout();

        $scope.pageReload = function(){
          $route.reload();  
        }
       
    
  }]);
