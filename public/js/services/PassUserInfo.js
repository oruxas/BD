angular
    .module('PassUserInfo',[])
    .service('PassUserInfo', [ function(){
    
        var userInfo = {};

        var addUserInfo = function(user){
            
            userInfo = user;
        }
        var getUserInfo = function(){
            return userInfo;
        }

    return {
        addUserInfo : addUserInfo,
        getUserInfo : getUserInfo
    }    

}]);