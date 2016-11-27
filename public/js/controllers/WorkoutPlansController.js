angular.module('WorkoutPlansController', [])
        .controller('WorkoutPlansController', ['$scope', 'WorkoutPlansFactory',  function ($scope, WorkoutPlansFactory){
            $scope.tagline = "This is example controller";

            WorkoutPlansFactory.get().then(function(result){
                console.log(JSON.stringify(result.data));
                $scope.workoutPlans = result.data;
            });

        }]);