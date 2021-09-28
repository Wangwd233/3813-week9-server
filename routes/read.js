const { MongoClient } = require("mongodb")

module.exports = {
    query: function query(db, colName, callback){
        console.log('Read Process launched');
        db.collection(colName).find({}).toArray(function(err, result) {
            if (err) throw err;
            callback(result);
        })
    }
}