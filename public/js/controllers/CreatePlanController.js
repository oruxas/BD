angular.module('CreatePlanController', [])
        .controller('CreatePlanController', ['$scope', 'WorkoutPlansFactory', 
                    'ExercisesFactory', 'authentication', 'PassUserInfo', 'TagsFactory',  
            function ($scope, WorkoutPlansFactory, ExercisesFactory, authentication, PassUserInfo, TagsFactory){
            
            $scope.exerciseForm = false;

            $scope.items = ["bodyweightForm", "weightsForm", "mixedForm", "default"];
            $scope.selection = $scope.items[3];
            $scope.templates = [{
                name: 'bodyweightForm.html',
                url: './views/forms/bodyweightForm.html'
            },{
                name: 'weightsForm.html',
                url: './views/forms/weightsForm.html'
            },{
                name: 'mixedForm.html',
                url: './views/forms/mixedForm.html'
            }];

            $scope.loadBodyweightForm =  function() {
               // $scope.bodyweightTemplate = $scope.templates[0];
                $scope.selection = $scope.items[0];
            }

            var partsString;
             $scope.loadWeightsForm =  function() {
                $scope.bodyPartsSelected = true;
                $scope.selection = $scope.items[1];
                //filtered exercises
                
                //get body parts tag which will be selectable for further filtering
                $scope.bodyPartTags = TagsFactory.getBodyPartTags();
                //alert(JSON.stringify($scope.bodyPartTags));
                 
                 //$scope.weightsExercises = TagsFactory.getWeightsExercises();
               
               //define bodyParts array
               $scope.selectedBodyParts = [];
                
                $scope.bodyPartsChanged = function(bodyPartsArr){
                    //console.log(bodyPartsArr); //array of exercises

                   $scope.selectedBodyParts = bodyPartsArr;
                   partsString =  $scope.selectedBodyParts.toString();
                   //console.log(partsString);

                   $scope.weightsExercises = TagsFactory.getWeightsExercisesByBodyPart(bodyPartsArr);
                }
            }
             $scope.loadMixedForm =  function() {
               // $scope.mixedTemplate = $scope.templates[2];
                $scope.selection = $scope.items[2];
            }

             $scope.loadDefault =  function() {
               // $scope.mixedTemplate = $scope.templates[2];
                $scope.selection = $scope.items[3];
            }

            $scope.master = {};

            //$scope.workoutPlan = {};
            

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
