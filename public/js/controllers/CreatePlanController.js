angular.module('CreatePlanController', [])
        .controller('CreatePlanController', ['$scope', 'WorkoutPlansFactory',  function ($scope, WorkoutPlansFactory){
            $scope.tagline = "This is create plans controller";

            
            
            /*WorkoutPlansFactory.get().then(function(result){
                console.log(JSON.stringify(result.data));
                $scope.workoutPlans = result.data;
            });
                */
        }]);