const { count } = require("console");
const { MongoClient } = require("mongodb")

module.exports = {
    create: function(db, colName, item, callback){
        console.log('Create Process launched');
        const query = {id: item.id};
        db.collection(colName).count(query, function(err, num){
            if (err) throw err;
            if (num == 0) {
               db.collection(colName).insertOne(item, function(err, res){
                if (err) throw err;
               });
               callback('Insert successfully');
            }else{
                callback('Already have the item');
            }
        })
        /*db.collection(colName).insertOne(item, function(err, res){
            if (err) throw err;
            
        });*/
    }
}