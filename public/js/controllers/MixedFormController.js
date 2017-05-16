angular.module('MixedFormController', [])
        .controller('MixedFormController', ['$scope', 'WorkoutPlansFactory', 
                    'ExercisesFactory',/* 'authentication', 'PassUserInfo',*/ 'TagsFactory',  
            function ($scope, WorkoutPlansFactory, ExercisesFactory,/* authentication, PassUserInfo,*/ TagsFactory){
            
            $scope.exerciseForm = false;

            var partsString;

            $scope.bodyPartsSelected = true;
                

            //initial exerccises
            var mixedExercises =[];
            //  load weights exercises initially no filtering
            function getWeightsExercises(weightsString, bodyweightString){
                        
              ExercisesFactory.getData().then(function(data){

                 for(var i=0; i<data.length; i++){
                    for(j=0; j< data[i].selectedExercises.tags.length; j++){
                       if(data[i].selectedExercises.tags[j].match(weightsString) || data[i].selectedExercises.tags[j].match(bodyweightString) ){
                          mixedExercises.push(data[i]);
                        }
                      }
                 }
               });
               $scope.mixedExercises = mixedExercises;
               return mixedExercises;
              } //end getWeightsExercises
              getWeightsExercises("weights", "bodyweight");

              //get body parts tag which will be selectable for further filtering
              $scope.bodyPartTags = TagsFactory.getBodyPartTags();
              // $scope.weightsExercises = TagsFactory.getWeightsExercises("weights");
                 
               //define bodyParts array
               $scope.selectedBodyParts = [];
                
               $scope.bodyPartsChanged = function(bodyPartsArr){
                  
                   $scope.selectedBodyParts = bodyPartsArr;
                   partsString =  $scope.selectedBodyParts.toString();
                   $scope.weightsExercises = [];
                   $scope.weightsExercises = TagsFactory.getWeightsExercisesByBodyPart(bodyPartsArr);
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
                  $scope.user = PassUserInfo.getUserInfo()
  
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
