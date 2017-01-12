angular
    .module('TagsFactory',[])
    .factory('TagsFactory', ['ExercisesFactory', function(ExercisesFactory){

        //search tags and filter exercises
        // var bodyPartTags = ["chest", "back", "shoulders", "quads", "hamstrings", 
        //                 "biceps", "triceps", "abs","glutes", "calves", "traps"];
        //separate in 2 arrays? : type and bodypart                

        var typeTags=["bodyweight", "weights", "mixed"];

        var bodyPartTags = [];
        var weightsExercisesByBodyPart =[];
        function getBodyPartTags(){
             ExercisesFactory.getTagData().then(function(tagsData){
                 for(var i = 0; i < tagsData.length;i++){
                     bodyPartTags.push(tagsData[i].tag);
                 }

                 //get weights exercises by tags
                
                 
             });
             return bodyPartTags;
        }
        getBodyPartTags();

         var weightsStr = typeTags[1];
         var weightsExercises =[];
           //get Exercises
            function getWeightsExercises(){
                 ExercisesFactory.getData().then(function(data){
                    // alert(JSON.stringify(data[0].selectedExercises.tags)); //gets tags

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
            } //end getWeightsExercises
           // getExercises();

           
          var selectedTags = [];
           function getWeightsExercisesByBodyPart(bodyPartsArr){ //arr b
               //alert(JSON.stringify(bodyPartsArr));
               //selectedBodyParts = bodyPartsArr.slice(0); //why not working push??
              //alert(bodyPartsArr);
            //   if (bodyPartsArr == undefined){
            //       bodyPartsArr = [];
            //   }
              selectedTags.push(bodyPartsArr);
              //console.log(bodyPartsArr.length);
                ExercisesFactory.getData().then(function(exercisesData){
                     //alert(JSON.stringify(exercisesData));
                    for(var i = 0; i < exercisesData.length; i++){
                        
                        for (var j = 0; j < exercisesData[i].selectedExercises.tags.length; j++){
                            //console.log(exercisesData[i].selectedExercises.tags[j]);

                            for(var k = 0; k < bodyPartsArr.length; k++){
                                if (exercisesData[i].selectedExercises.tags[j].match(bodyPartsArr[k])){
                                    weightsExercisesByBodyPart.push(exercisesData[i]);
                                }
                            }
                        }
                    }
                    //alert(JSON.stringify(weightsExercisesByBodyPart));
                 })
                 return weightsExercisesByBodyPart;
           }
           //getWeightsExercisesByBodyPart();


           //get bodyPartTags

        //    function getBodyPartTags(){
        //        return bodyPartTags;
        //    }

           
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
        getBodyPartTags : getBodyPartTags,
        getWeightsExercisesByBodyPart: getWeightsExercisesByBodyPart
    }    

}]);