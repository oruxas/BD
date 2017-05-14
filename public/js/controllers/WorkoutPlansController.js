angular.module('WorkoutPlansController', [])
        .controller('WorkoutPlansController', ['$scope', 'WorkoutPlansFactory',  function ($scope, WorkoutPlansFactory){
            $scope.tagline = "This is example controller";

            //for accordion
            $scope.oneAtATime = true; 
           /* $scope.status = {
                isCustomHeaderOpen: false,
                isFirstOpen: true,
                isFirstDisabled: false
            };*/

            WorkoutPlansFactory.get().then(function(result){
                console.log(JSON.stringify(result.data));
                $scope.workoutPlans = result.data;
            });

        //     WorkoutPlansFactory.get().then(function(result){
        //        // console.log(JSON.stringify(result.data));
                
        //            //alert(JSON.stringify(result.data)); 
        //         $scope.workoutPlans = result.data;
                
        //  });

            $scope.addUpvote = function(workoutPlan){
                //TODO: upvote functionality
                // if($event){
                //     $event.stopPropagation();
                //     $event.preventDefault();
                // }
                //alert(JSON.stringify(workoutPlan));
                //upvotes++;
                   workoutPlan.upvotes++;
                   //updatedb functionality
                   WorkoutPlansFactory.update(workoutPlan);
               
            }

            $scope.downloadPdf = function($event, id){
                 if($event){
                    $event.stopPropagation();
                    $event.preventDefault();
                    //alert($index);
                    // alert(JSON.stringify(id));

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