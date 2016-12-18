  angular.module('ProfileController', [])
    .controller('ProfileController', ['$location', 'meanData', 'authentication', function($location, meanData, authentication){
    var vm = this;

    vm.user = {};

    meanData.getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });

      vm.logout = function(){
        authentication.logout();
      }

    }]);