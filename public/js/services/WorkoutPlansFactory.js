angular.module('WorkoutPlansFactory', [])
        .factory('WorkoutPlansFactory', ['$http' , function($http){
            
            //interface
            return {
                    // call to get all workout Plans
                    get : function(){
                        return $http.get('/api/workoutPlans');
                    },

                    getWithEmail : function(email){
                        //alert(email);
                        return $http.get('/api/workoutPlans/'+email);
                    },

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
                }, //TODO:complete
                update : function(workoutPlanData){
                    return $http({
                        method : 'POST',
                        url : '/api/workoutPlans/:'+workoutPlanData._id,
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