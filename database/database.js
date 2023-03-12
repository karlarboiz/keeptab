const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
let mongodbURL = 'mongodb://localhost:0.0.0.0';
if(process.env.MONGODB_URL) {
    mongodbURL = process.env.MONGODB_URL
}

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