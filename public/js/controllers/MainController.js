angular.module('MainController', [])
        .controller('MainController', ['$scope', 'WorkoutPlansFactory', function($scope, WorkoutPlansFactory){

            $scope.tagline = "Should there be a list to pick workout immediately? Or two choices: \"Search for Plan\" and \"Create Plan\" ";
            
            $scope.oneAtATime = true; 

            WorkoutPlansFactory.get().then(function(result){
                console.log(JSON.stringify(result.data));
                
                   //alert(JSON.stringify(result.data)); 
                $scope.workoutPlans = result.data;
            });

        }]);