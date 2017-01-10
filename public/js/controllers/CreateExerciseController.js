angular.module('CreateExerciseController', [])
        .controller('CreateExerciseController', ['$scope', '$location', 'ExercisesFactory',  
                function ($scope, $location, ExercisesFactory){
    

            $scope.master = {};
            //$scope.exercise = {};

                $scope.update = function(exercise) {
                    $scope.exercise = angular.copy(exercise);
                };

                $scope.reset = function() {
                    $scope.exercise = angular.copy($scope.master);
                };

                function getExercisesTags(){
                    ExercisesFactory.getTagData().then(function(data){
                        //alert(JSON.stringify(data));
                        $scope.exerciseTags = data;
                    });
                }
                getExercisesTags();

                //selected tags arr
                //$scope.exercise.tags = [];
                $scope.tagsArr =[];
                 $scope.passTags = function(tag){

                         $scope.tagsArr.push(tag.tag);
                        //alert(JSON.stringify(tagsArr));
                        //set scope for tag
                        $scope.tag = tag;
                        //$scope.tag.disabled = true;     
                }
                

                $scope.saveExercise = function(exercise){
                    //alert(exercise.tags);
                   
                    
                    //split exercise.tags into array.
                    //tagsArr = exercise.tags.split(",");
                    //alert('po splitinimo tagsArr tipas yra: '+ typeof tagsArr + " o pries exercise.tags tipas: "+ typeof exercise.tags);

                    exercise.tags =  $scope.tagsArr;
                    alert(JSON.stringify(exercise));
                    //ExercisesFactory.create(exercise);
                    $scope.exerciseForm.$setPristine();
                    $scope.exercise = {};
                   
                      
                    $scope.tag.disabled = false;
                       
                      
                    //$scope.tagsArr.disabled = false;
                    $scope.tagsArr = [];

                }

                //tags
                $scope.saveTag = function(tag){
                    alert(JSON.stringify(tag));
                    ExercisesFactory.createTag(tag);
                }
        }]);
