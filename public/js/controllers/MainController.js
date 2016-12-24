angular.module('MainController', [])
        .controller('MainController', ['$scope', 'WorkoutPlansFactory', function($scope, WorkoutPlansFactory){

            $scope.tagline = "Should there be a list to pick workout immediately? Or two choices: \"Search for Plan\" and \"Create Plan\" ";
            
            $scope.oneAtATime = true; 

            WorkoutPlansFactory.get().then(function(result){
                console.log(JSON.stringify(result.data));
                
                   //alert(JSON.stringify(result.data)); 
                $scope.workoutPlans = result.data;
                
         });

         //var upvotes = 0;

            $scope.addUpvote = function($event, workoutPlan){
                //TODO: upvote functionality
                if($event){
                    $event.stopPropagation();
                    $event.preventDefault();
                }
                //alert(JSON.stringify(workoutPlan));
                //upvotes++;
                   workoutPlan.upvotes++;
                   //updatedb functionality
                   WorkoutPlansFactory.update(workoutPlan);
               
            }
            

        }]);