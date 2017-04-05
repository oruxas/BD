angular.module('MixedFormController', [])
        .controller('MixedFormController', ['$scope', 'WorkoutPlansFactory', 
                    'ExercisesFactory', 'authentication', 'PassUserInfo', 'TagsFactory',  
            function ($scope, WorkoutPlansFactory, ExercisesFactory, authentication, PassUserInfo, TagsFactory){
            
            $scope.exerciseForm = false;


        var partsString;


            
            // $scope.loadWeightsForm =  function() {
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
                            //alert(JSON.stringify(weightsExercises));
                        });
                        //alert(JSON.stringify($scope.exercises));
                         $scope.mixedExercises = mixedExercises;
                        return mixedExercises;
                    } //end getWeightsExercises
                    getWeightsExercises("weights", "bodyweight");


                //$scope.selection = $scope.items[1];
                //filtered exercises
                
                //get body parts tag which will be selectable for further filtering
                $scope.bodyPartTags = TagsFactory.getBodyPartTags();
                console.log(JSON.stringify($scope.bodyPartTags));
                 
                // $scope.weightsExercises = TagsFactory.getWeightsExercises("weights");
                 
               //define bodyParts array
               $scope.selectedBodyParts = [];
                
                $scope.bodyPartsChanged = function(bodyPartsArr){
                    //console.log(bodyPartsArr); //array of exercises
                  
                   $scope.selectedBodyParts = bodyPartsArr;
                   partsString =  $scope.selectedBodyParts.toString();
                   //console.log(partsString);
                   $scope.weightsExercises = [];
                   $scope.weightsExercises = TagsFactory.getWeightsExercisesByBodyPart(bodyPartsArr);
                }
           // }
             

                $scope.update = function(user) {
                    $scope.master = angular.copy(user);
                };

                $scope.reset = function() {
                    $scope.user = angular.copy($scope.master);
                };

                $scope.selectedExercises = [];
                $scope.save = function(workoutPlan, exerciseTitleObj){
                        //alert(JSON.stringify($scope.selectedBodyParts));
                        var bodyPartsString = $scope.selectedBodyParts.toString();
                        // if(authentication.isLoggedIn()){

                        // }    
                        for(var i = 0; i < exerciseTitleObj.length; i++){
                            $scope.selectedExercises.push(exerciseTitleObj[i].selectedExercises.title)
                        }
                        
                      
                        var selectedExercisesString = $scope.selectedExercises.toString();
                        $scope.user = PassUserInfo.getUserInfo()
                          //alert(selectedExercisesString);
                        
                         //alert(JSON.stringify($scope.user));
                         //TODO change to array
                         workoutPlan.exerciseTitle = selectedExercisesString;
                         workoutPlan.bodyPart = bodyPartsString;
                      // workoutPlan.exerciseTitle = exerciseTitleObj.selectedExercises.title;
                        //alert(JSON.stringify(workoutPlan.exerciseTitle));
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

                

                $scope.reset();
        }])//comparing arrays;
