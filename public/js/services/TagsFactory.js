angular
    .module('TagsFactory',[])
    .factory('TagsFactory', ['ExercisesFactory', function(ExercisesFactory){

        //search tags and filter exercises
        // var bodyPartTags = ["chest", "back", "shoulders", "quads", "hamstrings", 
        //                 "biceps", "triceps", "abs","glutes", "calves", "traps"];
        //separate in 2 arrays? : type and bodypart                

        var typeTags=["bodyweight", "weights", "mixed"];

        var bodyPartTags = [];
        
        function getBodyPartTags(){
             ExercisesFactory.getTagData().then(function(tagsData){
                 for(var i = 0; i < tagsData.length;i++){
                     //check if not already inside
                     if (bodyPartTags.indexOf(tagsData[i].tag) == -1){
                        bodyPartTags.push(tagsData[i].tag);
                     }
                     
                 }
             });
             return bodyPartTags;
        }
        getBodyPartTags();

        // var weightsStr = typeTags[1];
         var weightsExercises =[];
        // //  load weights exercises initially no filtering
        //     function getWeightsExercises(weightsString){
                
        //          ExercisesFactory.getData().then(function(data){
        //             // alert(JSON.stringify(data[0].selectedExercises.tags)); //gets tags

        //              for(var i=0; i<data.length; i++){
        //                  for(j=0; j< data[i].selectedExercises.tags.length; j++){
        //                      if(data[i].selectedExercises.tags[j].match(weightsString)){
        //                          weightsExercises.push(data[i]);
        //                      }
        //                  }
        //              }
        //              //alert(JSON.stringify(weightsExercises));
        //          });
        //         //alert(JSON.stringify($scope.exercises));
        //         return weightsExercises;
        //     } //end getWeightsExercises
           // getExercises();

          // var bodyweightString = typeTags[0];
           var bodyweightExercises = [];
           //load bodyweigh exercises initially no filtering

         

        //   function getBodyweightExercises(bodyweightString){
                
        //          ExercisesFactory.getData().then(function(data){
        //             // alert(JSON.stringify(data[0].selectedExercises.tags)); //gets tags
                   
        //              for(var i=0; i<data.length; i++){
        //                  for(j=0; j< data[i].selectedExercises.tags.length; j++){
        //                      if(data[i].selectedExercises.tags[j].match(bodyweightString)){
        //                          bodyweightExercises.push(data[i]);
        //                           console.log( bodyweightExercises);
        //                      }
        //                  }
        //              }
                       
        //          });
        //         //alert(JSON.stringify($scope.exercises));
        //       return bodyweightExercises;
        //     } //end getWeightsExercises

           
        
          var weightsExercisesByBodyPart =[];
           function getWeightsExercisesByBodyPart(bodyPartsArr){ //arr b      
              console.log(bodyPartsArr);
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

           var bodyweightExercisesByBodyPart =[];
           function getBodyweightExercisesByBodyPart(bodyPartsArr){ //arr b      
              //console.log(bodyPartsArr.length);
                ExercisesFactory.getData().then(function(exercisesData){
                     //alert(JSON.stringify(exercisesData));
                    for(var i = 0; i < exercisesData.length; i++){
                        
                        for (var j = 0; j < exercisesData[i].selectedExercises.tags.length; j++){
                            //console.log(exercisesData[i].selectedExercises.tags[j]);

                            for(var k = 0; k < bodyPartsArr.length; k++){
                                if (exercisesData[i].selectedExercises.tags[j].match(bodyPartsArr[k]) 
                               ){
                                    bodyweightExercisesByBodyPart.push(exercisesData[i]);
                                }
                            }
                        }
                    }
                    //alert(JSON.stringify(weightsExercisesByBodyPart));
                 })
                 return bodyweightExercisesByBodyPart;
           }


             var mixedExercisesByBodyPart =[];
           function getMixedExercisesByBodyPart(bodyPartsArr){ //arr b      
              //console.log(bodyPartsArr.length);
                ExercisesFactory.getData().then(function(exercisesData){
                     //alert(JSON.stringify(exercisesData));
                    for(var i = 0; i < exercisesData.length; i++){
                        
                        for (var j = 0; j < exercisesData[i].selectedExercises.tags.length; j++){
                            //console.log(exercisesData[i].selectedExercises.tags[j]);

                            for(var k = 0; k < bodyPartsArr.length; k++){
                                if (exercisesData[i].selectedExercises.tags[j].match(bodyPartsArr[k])){
                                    mixedExercisesByBodyPart.push(exercisesData[i]);
                                }
                            }
                        }
                    }
                    //alert(JSON.stringify(weightsExercisesByBodyPart));
                 })
                 return mixedExercisesByBodyPart;
           }

          


    return {
        //getWeightsExercises : getWeightsExercises,
        //getBodyweightExercises : getBodyweightExercises,
        getBodyweightExercisesByBodyPart: getBodyweightExercisesByBodyPart,
        getBodyPartTags : getBodyPartTags,
        getWeightsExercisesByBodyPart: getWeightsExercisesByBodyPart,
        getMixedExercisesByBodyPart : getMixedExercisesByBodyPart
    }    

}]);