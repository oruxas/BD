angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

        $routeProvider

        //home page

        .when('/',{
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        //workoutPlans page that'll use example controller
        .when('/workoutPlans', {
            templateUrl: 'views/workoutPlans.html',
            controller: 'WorkoutPlansController' 
        
        });

        $locationProvider.html5Mode(true);

    }]);