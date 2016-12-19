angular
    .module('meanData',[])
    .service('meanData', ['$http', 'authentication', function($http, authentication){
      var getProfile = function () {
        return $http.get('/api/profile', {
          headers: {
            Authorization: 'Bearer '+ authentication.getToken()
          }
        });
      };

      var deleteProfile = function(){
        return $http.delete('/api/profile', {
          headers:{
            Authorization: 'Bearer '+ authentication.logout()
          }
        })
      }

      return {
        getProfile : getProfile,
        deleteProfile : deleteProfile
      };
    }]);
