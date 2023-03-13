const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let mongodbURL = "mongodb+srv://karlarboiz:O2oaiaxkmIZj7huz@cluster0.ihvsaps.mongodb.net/?retryWrites=true&w=majority";

let handleData;

async function run(){
    const client = await MongoClient.connect(mongodbURL);
    handleData = client.db('keeptab2');
}

function getDb() {
    if(!handleData) {
        throw {message: "Connection failed"}
    }

   return handleData
}



module.exports = {
    runFunc: run,
    getDbFunc: getDb
}