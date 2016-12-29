angular
    .module('TagsFactory',[])
    .factory('TagsFactory', ['ExercisesFactory', function(ExercisesFactory){

        //search tags and filter exercises
        var bodyPartTags = ["chest", "back", "shoulders", "quads", "hamstrings", 
                        "biceps", "triceps", "abs","glutes", "calves", "traps"];
        //separate in 2 arrays? : type and bodypart                

        var typeTags=["bodyweight", "weights", "mixed"];

         var weightsStr = typeTags[1];
         var weightsExercises =[];
           //get Exercises
            function getWeightsExercises(){
                 ExercisesFactory.getData().then(function(data){
                     //alert(JSON.stringify(data[0].selectedExercises.tags)); //gets tags

                     for(var i=0; i<data.length; i++){
                         for(j=0; j< data[i].selectedExercises.tags.length; j++){
                             if(data[i].selectedExercises.tags[j].match(weightsStr)){
                                 weightsExercises.push(data[i]);
                             }
                         }
                     }
                     //alert(JSON.stringify(weightsExercises));
                 });
                //alert(JSON.stringify($scope.exercises));
                return weightsExercises;
            }
           // getExercises();

           //get bodyPartTags

           function getBodyPartTags(){
               return bodyPartTags;
           }

           
    // var getWeightsWxercises = function(weightsStr, $scope.exer ){

    // }



        // var addUserInfo = function(user){
            
        //     userInfo = user;
        // }
        // var getUserInfo = function(){
        //     return userInfo;
        // }

    return {
        getWeightsExercises : getWeightsExercises,
        getBodyPartTags : getBodyPartTags
    }    

}]);