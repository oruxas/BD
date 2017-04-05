// public/js/app.js
angular.module('workoutPlansApp', ['ngRoute', 'appRoutes', 'MainController', 
'WorkoutPlansController', 'CreatePlanController', 'BodyweightFormController', 'WeightsFormController', 'MixedFormController', 'WorkoutPlansFactory', 
'NavigationController', 'LoginController', 'RegisterController', 'ProfileController', 
'authentication', 'meanData', 'LogoutController', 'CreateExerciseController',
 'ExercisesFactory', 'PassUserInfo', 'TagsFactory', 'ui.bootstrap'])

    .run( function($rootScope, $location, authentication){
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
             
            if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
                $location.path('/');
            } 

            if ($location.path() === '/admin' && !authentication.isLoggedIn() && !authentication.isAdmin()) {
                alert('You are not an ADMIN');
                $location.path('/');
            } else if ( $location.path() === '/admin' && authentication.isLoggedIn() && !authentication.isAdmin()){
                alert('You are not an ADMIN');
                $location.path('/');
            }
        });
    });