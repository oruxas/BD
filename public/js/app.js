// public/js/app.js
angular.module('workoutPlansApp', ['ngRoute', 'appRoutes', 'MainController', 
'WorkoutPlansController', 'CreatePlanController', 'WorkoutPlansFactory', 
'NavigationController', 'LoginController', 'RegisterController', 'ProfileController', 
'authentication', 'meanData', 'LogoutController', 'CreateExerciseController',
 'ExercisesFactory', 'PassUserInfo', 'TagsFactory', 'ui.bootstrap'])

    .run( function($rootScope, $location, authentication){
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
            if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
                $location.path('/');
            }
        });
    });