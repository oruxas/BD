 angular.module('LoginController', [])
  .controller('LoginController', ['$location', 'authentication', function($location, authentication){
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      authentication
        .login(vm.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('profile');
        });
    };
  }]);
