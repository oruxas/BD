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

           
           var weightsExercisesByBodyPart =[];
           function getWeightsExercisesByBodyPart(bodyPartsArr){ //arr b
               //alert(JSON.stringify(bodyPartsArr));
               //selectedBodyParts = bodyPartsArr.slice(0); //why not working push??
               
               ExercisesFactory.getData().then(function(data){
                   //alert(JSON.stringify(data));

                   var found = false;
                   //console.log(bodyPartsArr[0]);
                
                   //console.log(Array.isArray(bodyPartsArr));
                        //console.log('happening');
                    for(var i=0; i< data.length; i++){
                       
                       for(var j=0; j< bodyPartsArr.length;j++){
                           if (data[0].selectedExercises.tags.indexOf(JSON.stringify(bodyPartsArr[1])) > -1){
                               console.log(data[i]);
                               weightsExercisesByBodyPart.push(data[i]);
                               found=true;
                               break;
                           }
                       }
                    }  
                      //console.log(weightsExercisesByBodyPart);
                    //console.log(weightsExercisesByBodyPart) ;
                   // console.log(weightsExercisesByBodyPart);
                   //console.log(data[0].selectedExercises.tags);
               });

           }



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
        getBodyPartTags : getBodyPartTags,
        getWeightsExercisesByBodyPart: getWeightsExercisesByBodyPart
    }    

}]);