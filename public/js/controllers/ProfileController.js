  angular.module('ProfileController', [])
    .controller('ProfileController', ['$location', 'meanData', 'authentication', 'WorkoutPlansFactory', 
                function($location, meanData, authentication, WorkoutPlansFactory){
    var vm = this;

    vm.user = {};  
    meanData.getProfile()
      .success(function(data) {
        vm.user = data;       
        //alert(JSON.stringify(vm.user)); 
      })
      .error(function (e) {
        console.log(e);
      });
      

    }]);