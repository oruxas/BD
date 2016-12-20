angular.module('CreateExerciseController', [])
        .controller('CreateExerciseController', ['$scope', '$location', 'ExercisesFactory',  
                function ($scope, $location, ExercisesFactory){
    

            $scope.master = {};
            

                $scope.update = function(exercise) {
                    $scope.master = angular.copy(exercise);
                };

                $scope.reset = function() {
                    $scope.exercise = angular.copy($scope.master);
                };

                $scope.saveExercise = function(exercise){
                    alert(JSON.stringify(exercise));
                    ExercisesFactory.create(exercise);

                
                }

                $scope.reset();
        }]);
