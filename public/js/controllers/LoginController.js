 angular.module('LoginController', [])
  .controller('LoginController', ['$location', '$window', 'authentication', function($location, $window, authentication){
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      
      authentication
        .login(vm.credentials)
        .error(function(err){
          alert(JSON.stringify(err));
        })
        .then(function(){
          $location.path('profile');

          console.log('replace profile happening');
          
        });

        
    };

  }]);
