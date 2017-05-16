angular.module('WorkoutPlansController', [])
        .controller('WorkoutPlansController', ['$scope', 'WorkoutPlansFactory',  function ($scope, WorkoutPlansFactory){
            $scope.tagline = "This is example controller";

            //for accordion
            $scope.oneAtATime = true; 


            WorkoutPlansFactory.get().then(function(result){
                $scope.workoutPlans = result.data;
            });
            $scope.addUpvote = function(workoutPlan){
               workoutPlan.upvotes++;
                   
               WorkoutPlansFactory.update(workoutPlan);
            }

            $scope.downloadPdf = function($event, id){
                 if($event){
                    $event.stopPropagation();
                    $event.preventDefault();

                    WorkoutPlansFactory.getById(id).then(function(result){
                        $scope.print = result.data;
                        //alert(JSON.stringify($scope.print));
                    });
                }
               
            }  

            //only by admin;
            $scope.delete = function($event, workoutPlanData){
                if($event){
                    $event.stopPropagation();
                    $event.preventDefault();
                    //alert($index);
                    // alert(JSON.stringify(id));

                    WorkoutPlansFactory.delete(workoutPlanData).then(function(data){
                        console.log('deleted');
                    });
                }
            } 

        }]);