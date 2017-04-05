 angular.module('LoginController', [])
  .controller('LoginController', ['$location', '$window', 'authentication', function($location, $window, authentication){
    var vm = this;

    vm.credentials = {
      email : "",
      password : "",
      role : ""
    };

    vm.onSubmit = function () {
      
      authentication
        .login(vm.credentials)
        .error(function(err){
          alert(JSON.stringify(err));
        })
        .then(function(){

         // $rootScope.$broadcast('userLoggedIn');
          $window.location.reload();
          $location.path('profile');
          
          console.log('replace profile happening');
          
        });

        
    };

  }]);
