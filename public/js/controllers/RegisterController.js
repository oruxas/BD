angular.module('RegisterController', [])
  .controller('RegisterController', ['$location', 'authentication', function($location, authentication){
      var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password : "",
      //role : "guest"
    };

    vm.onSubmit = function () {
      console.log('Submitting registration');
      authentication
        .register(vm.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){

          console.log('success')
          $location.path('profile');
        });
    };
    }]);
