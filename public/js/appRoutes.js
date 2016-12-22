angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
           $locationProvider.html5Mode(true);
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
        
        })
        .when('/createPlan', {
            templateUrl: 'views/createPlan.html',
            controller: 'CreatePlanController' 
        
    })
    .when('/createExercise', {
            templateUrl: 'views/forms/exerciseForm.html',
            controller: 'CreateExerciseController' 
        
    })
 
    //authentication
     .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm'
      })
      .when('/logout', {
        templateUrl: 'views/home.html',
        controller: 'LogoutController'
        
      })
      
      .otherwise({
        redirectTo: '/'
    });
       

     

    }  
    ]);