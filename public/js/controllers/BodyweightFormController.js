angular.module('BodyweightFormController', [])
        .controller('BodyweightFormController', ['$scope', 'WorkoutPlansFactory', 
                    'ExercisesFactory', 'TagsFactory',  
            function ($scope, WorkoutPlansFactory, ExercisesFactory, TagsFactory){

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
                $scope.bodyweightExercises = bodyweightExercises;
              return  $scope.bodyweightExercises;
            } //end getWeightsExercises
            getBodyweightExercises("bodyweight");

           
            $scope.bodyPartTags = TagsFactory.getBodyPartTags();

            $scope.tagType = "bodyweight";
            //$scope.bodyweightExercises = TagsFactory.getBodyweightExercises($scope.tagType);
            console.log($scope.bodyweightExercises);
            //define bodyParts array
            $scope.selectedBodyParts = [];
      
              //to filter existin exercises
            $scope.bodyPartsChanged = function(bodyPartsArr){
                //alert(bodyPartsArr);
                $scope.selectedBodyParts = bodyPartsArr;
                partsString =  $scope.selectedBodyParts.toString();
                //console.log(partsString);
                $scope.bodyweightExercises = [];
                $scope.bodyweightExercises = TagsFactory.getBodyweightExercisesByBodyPart( $scope.selectedBodyParts);
            }        

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
}])//comparing arrays;
