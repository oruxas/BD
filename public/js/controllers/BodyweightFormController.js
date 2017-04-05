angular.module('BodyweightFormController', [])
        .controller('BodyweightFormController', ['$scope', 'WorkoutPlansFactory', 
                    'ExercisesFactory', 'authentication', 'PassUserInfo', 'TagsFactory',  
            function ($scope, WorkoutPlansFactory, ExercisesFactory, authentication, PassUserInfo, TagsFactory){

        var partsString;
          //  $scope.loadBodyweightForm =  function() {
              $scope.bodyPartsSelected = true;
               // $scope.selection = $scope.items[1];
        var bodyweightExercises = [];    
          function getBodyweightExercises(bodyweightString){
                
                 ExercisesFactory.getData().then(function(data){
                    // alert(JSON.stringify(data[0].selectedExercises.tags)); //gets tags
                   
                     for(var i=0; i<data.length; i++){
                         for(j=0; j< data[i].selectedExercises.tags.length; j++){
                             if(data[i].selectedExercises.tags[j].match(bodyweightString)){
                                 bodyweightExercises.push(data[i]);
                                  console.log( bodyweightExercises);
                             }
                         }
                     }
                       
                 });
                //alert(JSON.stringify($scope.exercises));
                $scope.bodyweightExercises = bodyweightExercises;
              return  $scope.bodyweightExercises;
            } //end getWeightsExercises
            getBodyweightExercises("bodyweight");

            //get body parts tag which will be selectable for further filtering
            $scope.bodyPartTags = TagsFactory.getBodyPartTags();

            $scope.tagType = "bodyweight";
            //$scope.bodyweightExercises = TagsFactory.getBodyweightExercises($scope.tagType);
            console.log($scope.bodyweightExercises);
            //define bodyParts array
             $scope.selectedBodyParts = [];
      
              //to filter existin exercises
            $scope.bodyPartsChanged = function(bodyPartsArr){
                alert(bodyPartsArr);
                $scope.selectedBodyParts = bodyPartsArr;
                partsString =  $scope.selectedBodyParts.toString();
                //console.log(partsString);
                $scope.bodyweightExercises = [];
                $scope.bodyweightExercises = TagsFactory.getBodyweightExercisesByBodyPart( $scope.selectedBodyParts);
            }        

                $scope.selectedExercises = [];
                $scope.save = function(workoutPlan, exerciseTitleObj){
                    //alert(JSON.stringify($scope.selectedBodyParts));
                    var bodyPartsString = $scope.selectedBodyParts.toString();    
                    for(var i = 0; i < exerciseTitleObj.length; i++){
                         $scope.selectedExercises.push(exerciseTitleObj[i].selectedExercises.title)
                    }

                    var selectedExercisesString = $scope.selectedExercises.toString();
                    $scope.user = PassUserInfo.getUserInfo()

                    //TODO change to array
                    workoutPlan.exerciseTitle = selectedExercisesString;
                    workoutPlan.bodyPart = bodyPartsString;
                    // workoutPlan.exerciseTitle = exerciseTitleObj.selectedExercises.title;
                        if(angular.isDefined($scope.user)){
                            workoutPlan.userName = $scope.user.name;
                            workoutPlan.userEmail = $scope.user.email;     
                        } else {
                            workoutPlan.userName = "guest";
                            workoutPlan.userEmail = "guest";
                        }
                       

                    //alert(JSON.stringify(workoutPlan));
                    WorkoutPlansFactory.create(workoutPlan);
                }

                

              //  $scope.reset();
        }])//comparing arrays;
