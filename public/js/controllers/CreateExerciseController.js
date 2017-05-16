angular.module('CreateExerciseController', [])
        .controller('CreateExerciseController', ['$scope', '$location', 'ExercisesFactory',  
                function ($scope, $location, ExercisesFactory){
    

            $scope.master = {};

                $scope.update = function(exercise) {
                    $scope.exercise = angular.copy(exercise);
                };

                $scope.reset = function() {
                    $scope.exercise = angular.copy($scope.master);
                };

                function getExercisesTags(){
                    ExercisesFactory.getTagData().then(function(data){
                        $scope.exerciseTags = data;
                    });
                }
                getExercisesTags();

                $scope.tagsArr =[];
                $scope.passTags = function(tag){

                    $scope.tagsArr.push(tag.tag);
                    $scope.tag = tag;   
                }
                

                $scope.saveExercise = function(exercise){

                    exercise.tags =  $scope.tagsArr;
                    ExercisesFactory.create(exercise);
                    $scope.exerciseForm.$setPristine();
                    $scope.exercise = {};
                   
                      
                    $scope.tag.disabled = false;

                    $scope.tagsArr = [];

                }
                //tags
                $scope.saveTag = function(tag){
                    //alert(JSON.stringify(tag));
                    ExercisesFactory.createTag(tag);
                }
}]);
