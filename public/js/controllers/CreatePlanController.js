angular.module('CreatePlanController', [])
        .controller('CreatePlanController', ['$scope', 'WorkoutPlansFactory', 
                    'ExercisesFactory', 'TagsFactory',  
            function ($scope, WorkoutPlansFactory, ExercisesFactory, TagsFactory){
            
            $scope.exerciseForm = false;

        

            var partsString;


            
            // $scope.loadWeightsForm =  function() {
            $scope.bodyPartsSelected = true;
                
             $scope.loadMixedForm =  function() {
               // $scope.mixedTemplate = $scope.templates[2];
             
                 $scope.bodyPartTags = TagsFactory.getBodyPartTags();
                   $scope.selectedBodyParts = [];
                    $scope.bodyPartsChanged = function(bodyPartsArr){
                    //console.log(bodyPartsArr); //array of exercises

                   $scope.selectedBodyParts = bodyPartsArr;
                   partsString =  $scope.selectedBodyParts.toString();
                   //console.log(partsString);

                   $scope.weightsExercises = TagsFactory.getMixedExercisesByBodyPart(bodyPartsArr);
                }

              }

              $scope.update = function(user) {
                $scope.master = angular.copy(user);
              };

              $scope.reset = function() {
                $scope.user = angular.copy($scope.master);
              };

              $scope.selectedExercises = [];
              $scope.save = function(workoutPlan, exerciseTitleObj){
                        
                  var bodyPartsString = $scope.selectedBodyParts.toString();
                         
                  for(var i = 0; i < exerciseTitleObj.length; i++){
                    $scope.selectedExercises.push(exerciseTitleObj[i].selectedExercises.title)
                  }
                        
                      
                  var selectedExercisesString = $scope.selectedExercises.toString();
                  
                  workoutPlan.exerciseTitle = selectedExercisesString;
                  workoutPlan.bodyPart = bodyPartsString;

                  if(angular.isDefined($scope.user)){
                     workoutPlan.userName = $scope.user.name;
                     workoutPlan.userEmail = $scope.user.email;     
                  } else {
                            workoutPlan.userName = "guest";
                            workoutPlan.userEmail = "guest";
                  }
                    WorkoutPlansFactory.create(workoutPlan);
                }
                $scope.reset();
}])//comparing arrays;
