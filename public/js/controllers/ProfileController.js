  angular.module('ProfileController', [])
    .controller('ProfileController', 
      ['$scope', '$location', 'meanData', 'authentication', 'WorkoutPlansFactory', 'PassUserInfo', 'ExercisesFactory', 'TagsFactory', 
                function($scope, $location, meanData, authentication, WorkoutPlansFactory, PassUserInfo, ExercisesFactory, TagsFactory){
    var vm = this;

    
    vm.user = {};  
    //vm.userPlans = {};
    vm.showMessage = true;
    console.log('ProfileController')
    
    meanData.getProfile()
      .success(function(data) {
        //alert(JSON.stringify(data));
        vm.user = data;   

        if (authentication.isAdmin){
          WorkoutPlansFactory.get().then(function(result){
            $scope.userPlansList = result.data;
            console.log(result.data);

            $scope.planChanged = function(obj){
              $scope.planToEdit = obj;
              alert(JSON.stringify($scope.planToEdit));
              $scope.workoutPlan = $scope.planToEdit;
               //alert($scope.workoutPlan.selectedExercises);
               
               
               
//================================================================================================================

              $scope.exerciseForm = false;
              var partsString;
          
               $scope.bodyPartsSelected = true;
                    
              //initial exerccises
              var mixedExercises =[];
              //  load weights exercises initially no filtering
              function getWeightsExercises(weightsString, bodyweightString){
                            
                 ExercisesFactory.getData().then(function(data){
                   // alert(JSON.stringify(data[0].selectedExercises.tags)); //gets tags

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

               $scope.bodyPartTags = TagsFactory.getBodyPartTags();
                    
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
               
                 $scope.delete = function($event, workoutPlanData){
                if($event){
                    $event.stopPropagation();
                    $event.preventDefault();
                    WorkoutPlansFactory.delete(workoutPlanData).then(function(data){
                        console.log('deleted');
                        $location.reload();
                        });
                    }
                } 

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
                WorkoutPlansFactory.update(workoutPlan);
              }//end save

               


            }
          });
//================================================================================================================
        } else {
          WorkoutPlansFactory.getWithEmail(vm.user.email).then(function(result){
            $scope.userPlans = result.data;
            vm.showMessage = false; 

          });
        }

      })
      .error(function (e) {
        console.log(e);
      });
}]);