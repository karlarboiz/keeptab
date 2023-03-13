const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let mongodbURL = 'mongodb://localhost:27017'; 

if(process.env.DB_MONGODBURL) {
    mongodbURL = process.env.DB_MONGODBURL
}
let handleData;

async function run(){
    const client = await MongoClient.connect(mongodbURL);
    console.log(mongodbURL)
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