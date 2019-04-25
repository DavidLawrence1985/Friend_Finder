// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be 
// used to handle the compatibility logic.var tableData = require("../data/friends");

var friends = require("../data/friends")



module.exports = function(app){

    app.get("/api/friends", function(req, res){


      
        res.json(friends);
        
    })
    
    
    
    app.post("/api/friends", function(req,res){
              friends.push(req.body);

              for(var i = 0; i < friends.length; i++){

                var newest = friends[friends.length - 1];
        
        
                var x = newest.score.map(function(item, index) {
             
                    return Math.abs(item - friends[i].score[index]);//difference between arrays 
                })
                //   console.log("difference between arrays:" + x);
                function getSum(total, num) {
                    return total + num;
                }
                var y = x.reduce(getSum);//total of diffrence of arrays 
                //   console.log("total difference:" + y);
                
                friends[i].value = parseInt(y);
                console.log(friends[i].value);
                }
                
                friends.pop();
        
                var min = Math.min.apply(null, friends.map(function(item) {
                    return item.value;
                    
                  }));
                
                
               best = friends.find(o => o.value === min);//o => o.value === min

               friends.push(newest);
        
                // console.log(best);
                
                console.log("name: " + best.name);


              res.json(best)
              
          
    })


}
    
