const { MongoClient } = require("mongodb")

module.exports = {
    delete: function (db, colName, id, callback){
        console.log('Delete Process launched');
        db.collection(colName).count(id, function(err, num){
            if (err) throw err;
            //console.log(num);
            if (num == 0){
                callback('The item with id ' + id.id + ' is not exist');
            }else{
                db.collection(colName).deleteOne(id, function(err, res){
                    if (err) throw err;
                })
                callback('The item with id ' + id.id + ' removed Successfully!');
            }
        })
    }
}