const { MongoClient } = require("mongodb")

module.exports = {
    update: function(db, colName, item, callback){
        console.log('Update Process launched');
        const query = {id: item.id};
        const newValues = { $set: item };
        db.collection(colName).count(query, function(err, num){
            if (err) throw err;
            //console.log(num);
            if (num == 0){
               callback('The item with id ' + item.id + ' is not exist');
            }else{
                db.collection(colName).updateOne(query, newValues, function(err, res){
                    if (err) throw err;
                })
                callback('The item with id ' + item.id + ' updated Successfully!');
            }
        })
    }
}