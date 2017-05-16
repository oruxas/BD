angular.module('WeightsFormController', [])
        .controller('WeightsFormController', ['$scope', 'WorkoutPlansFactory', 
                    'ExercisesFactory', 'TagsFactory',  
            function ($scope, WorkoutPlansFactory, ExercisesFactory, TagsFactory){
            
            $scope.exerciseForm = false;

            var partsString;

            $scope.bodyPartsSelected = true;
                
             //initial exerccises
             var weightsExercises =[];
             //  load weights exercises initially no filtering
             function getWeightsExercises(weightsString){
                        
               ExercisesFactory.getData().then(function(data){
                   
                for(var i=0; i<data.length; i++){
                  for(j=0; j< data[i].selectedExercises.tags.length; j++){
                     if(data[i].selectedExercises.tags[j].match(weightsString)){
                        weightsExercises.push(data[i]);
                      }
                    }
                  }
               });
               $scope.weightsExercises = weightsExercises;
               return weightsExercises;
               } //end getWeightsExercises
               getWeightsExercises("weights");

                $scope.bodyPartTags = TagsFactory.getBodyPartTags();

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
