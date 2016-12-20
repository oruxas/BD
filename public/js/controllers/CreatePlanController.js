angular.module('CreatePlanController', [])
        .controller('CreatePlanController', ['$scope', 'WorkoutPlansFactory', 'ExercisesFactory',  
            function ($scope, WorkoutPlansFactory, ExercisesFactory){
            
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
               // $scope.weightsTemplate = $scope.templates[1];
                $scope.selection = $scope.items[1];
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
            function getExercises(){
                 ExercisesFactory.getData().then(function(data){
                     $scope.exercises = data;
                 });
                //alert(JSON.stringify($scope.exercises));
            }
            getExercises();

            $scope.master = {};
            

                $scope.update = function(user) {
                    $scope.master = angular.copy(user);
                };

                $scope.reset = function() {
                    $scope.user = angular.copy($scope.master);
                };

                $scope.save = function(workoutPlan){
                    alert(JSON.stringify(workoutPlan));
                    WorkoutPlansFactory.create(workoutPlan);
                }

                $scope.reset();
        }]);
