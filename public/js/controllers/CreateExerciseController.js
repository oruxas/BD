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
                    //alert(exercise.tags);

                    //split exercise.tags into array.
                    var tagsArr = exercise.tags.split(",");
                    //alert('po splitinimo tagsArr tipas yra: '+ typeof tagsArr + " o pries exercise.tags tipas: "+ typeof exercise.tags);

                    exercise.tags = tagsArr;
                    alert(JSON.stringify(exercise));
                    ExercisesFactory.create(exercise);

                
                }

                $scope.reset();
        }]);
