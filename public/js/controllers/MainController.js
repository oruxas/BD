angular.module('MainController', [])
        .controller('MainController', ['$scope', '$http', 'WorkoutPlansFactory', 'authentication',  
                                    function($scope, $http, WorkoutPlansFactory, authentication){

            $scope.tagline = "Should there be a list to pick workout immediately? Or two choices: \"Search for Plan\" and \"Create Plan\" ";
            
            $scope.oneAtATime = true; 
            
            //console.log('Served by: ', process.env.PORT);
        

            
        }]);