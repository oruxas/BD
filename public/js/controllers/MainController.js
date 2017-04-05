angular.module('MainController', [])
        .controller('MainController', ['$scope', '$http', 'WorkoutPlansFactory', 'authentication',  
                                    function($scope, $http, WorkoutPlansFactory, authentication){

            $scope.tagline = "Should there be a list to pick workout immediately? Or two choices: \"Search for Plan\" and \"Create Plan\" ";
            
            $scope.oneAtATime = true; 
            
            //console.log('Served by: ', process.env.PORT);
        

            WorkoutPlansFactory.get().then(function(result){
               // console.log(JSON.stringify(result.data));
                
                   //alert(JSON.stringify(result.data)); 
                $scope.workoutPlans = result.data;
                
         });

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