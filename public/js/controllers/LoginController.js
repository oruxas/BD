 angular.module('LoginController', [])
  .controller('LoginController', ['$location','$route' , 'authentication', function($location, $route, authentication){
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
         $route.reload();
    };
  }]);
