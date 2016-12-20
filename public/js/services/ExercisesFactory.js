angular.module('ExercisesFactory', [])
        .factory('ExercisesFactory', ['$http' , function($http){
            
            //interface
            return {
                    // call to get all exercises
                    getData : function(){
                        var promise = $http.get('/api/exercises').then(function(response){
                            return response.data;
                        });
                        return promise;
                    },
                //these will work when more API routes are defined on Node side

                //calls to POST and create new exercise
                create : function(exerciseData){
                    return $http({
                        method : 'POST',
                        url : '/api/exercises',
                        headers : { 'Content-Type' : 'application/json' },
                        data : exerciseData
                        
                    }).success(function(response){
                        
                        console.log(JSON.stringify(response));
        });
                },

                //Call to DELETE exercise
                delete : function(id){
                    return $http.delete('/api/exercises' + id);
                }



                
        } // end of factory




        }]);