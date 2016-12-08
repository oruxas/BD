angular.module('WorkoutPlansService', [])
        .factory('WorkoutPlansFactory', ['$http', function($http){
            
            //interface
            return {
                    // call to get all workout Plans
                    get : function(){
                        return $http.get('/api/workoutPlans');
                    },
                //these will work when more API routes are defined on Node side

                //calls to POST and create new workoutPlan
                create : function(workoutPlanData){
                    return $http({
                        method : 'POST',
                        url : '/api/workoutPlans',
                        headers : { 'Content-Type' : 'application/json' },
                        data : workoutPlanData
                        
                    }).success(function(response){
                        //$scope.workoutPlan = {};
                        //$scope.scores = response;
                        console.log(JSON.stringify(response));
        });
                },

                //Call to DELETE workout plan
                delete : function(id){
                    return $http.delete('/api/workoutPlans' + id);
                }



                
        } // end of factory




        }]);