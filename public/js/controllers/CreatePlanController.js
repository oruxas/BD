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

             $scope.loadWeightsForm =  function() {
                $scope.bodyPartsSelected = true;
                $scope.selection = $scope.items[1];
                //filtered exercises
                
                //get body parts tag which will be selectable for further filtering
                $scope.bodyPartTags = TagsFactory.getBodyPartTags();
                //alert(JSON.stringify($scope.bodyPartTags));
                 
                 $scope.weightsExercises = TagsFactory.getWeightsExercises();
               
                $scope.bodyPartsChanged = function(bodyPartsArr){
                    //console.log(bodyPartsArr); //array of exercises

                   $scope.selectedBodyParts = bodyPartsArr;

                   TagsFactory.getWeightsExercisesByBodyPart(bodyPartsArr);

                //    console.log(JSON.stringify($scope.selectedBodyParts));
                //     //only happen after body part selected
                //    // $scope.weightsExercises = TagsFactory.getWeightsExercisesByBodyPart(bodyPartsArr);
                //    console.log(JSON.stringify($scope.weightsExercises[0].selectedExercises.tags));
                }

                //alert(JSON.stringify($scope.weightsExercises));
            }
             $scope.loadMixedForm =  function() {
               // $scope.mixedTemplate = $scope.templates[2];
                $scope.selection = $scope.items[2];
            }

             $scope.loadDefault =  function() {
               // $scope.mixedTemplate = $scope.templates[2];
                $scope.selection = $scope.items[3];
            }


            //get Exercises
            // function getExercises(){
            //      ExercisesFactory.getData().then(function(data){
            //          $scope.exercises = data;
            //      });
            //     //alert(JSON.stringify($scope.exercises));
            // }
            // getExercises();



            

            $scope.master = {};

            //$scope.workoutPlan = {};
            

                $scope.update = function(user) {
                    $scope.master = angular.copy(user);
                };

                $scope.reset = function() {
                    $scope.user = angular.copy($scope.master);
                };

                $scope.save = function(workoutPlan, exerciseTitleObj){
                        //alert(exerciseTitleObj);

                        // if(authentication.isLoggedIn()){

                        // }    
                
                        $scope.user = PassUserInfo.getUserInfo()

                        
                         //alert(JSON.stringify($scope.user));
                         //TODO change to array
                       workoutPlan.exerciseTitle = exerciseTitleObj.selectedExercises.title;
                        //alert(JSON.stringify(workoutPlan.exerciseTitle));
                        if(angular.isDefined($scope.user)){
                            workoutPlan.userName = $scope.user.name;
                            workoutPlan.userEmail = $scope.user.email;     
                        } else {
                            workoutPlan.userName = "guest";
                            workoutPlan.userEmail = "guest";
                        }
                       

                    alert(JSON.stringify(workoutPlan));
                    WorkoutPlansFactory.create(workoutPlan);
                }

                $scope.reset();
        }])//comparing arrays;
