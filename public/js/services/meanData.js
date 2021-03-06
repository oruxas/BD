angular
    .module('meanData',[])
    .service('meanData', ['$http', 'authentication', function($http, authentication){
      var getProfile = function () {
        console.log('meanData getProfile happening');
        return $http.get('/api/profile', {
          headers: {
            Authorization: 'Bearer '+ authentication.getToken()
          }
        });
      };

      // var getAdmin = function () {
      //   console.log('meanData getAdmin happening');
      //   return $http.get('/api/admin', {
      //     headers: {
      //       Authorization: 'Bearer '+ authentication.getToken()
      //     }
      //   });
      // };

      var deleteProfile = function(){
        return $http.delete('/api/profile', {
          headers:{
            Authorization: 'Bearer '+ authentication.logout()
          }
        })
      }

      return {
        getProfile : getProfile,
        //getAdmin : getAdmin,
        deleteProfile : deleteProfile
      };
    }]);