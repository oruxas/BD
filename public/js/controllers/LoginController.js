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
        })
        .then(function(){
        
          $location.path('profile');
           $window.location.reload();
          console.log('replace profile happening');
          
        });

        
    };

  }]);
