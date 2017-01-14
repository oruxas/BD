  angular.module('ProfileController', [])
    .controller('ProfileController', ['$scope', '$location', 'meanData', 'authentication', 'WorkoutPlansFactory', 
                function($scope, $location, meanData, authentication, WorkoutPlansFactory){
    var vm = this;

    
    vm.user = {};  
    //vm.userPlans = {};
    vm.showMessage = true;
    console.log('ProfileController')
    
    meanData.getProfile()
      .success(function(data) {
        //alert(JSON.stringify(data));
        vm.user = data;     
        
        //alert(JSON.stringify(vm.user)); 
        console.log('success')
        WorkoutPlansFactory.getWithEmail(vm.user.email).then(function(result){
          //alert(JSON.stringify(result.data));
           vm.userPlans = result.data;
           vm.showMessage = false; 

        });


      })
      .error(function (e) {
        console.log(e);
      });
      

    }]);