const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let mongodbURL = 'mongodb://localhost:27017'; 

if(process.env.DB_USERNAME || process.env.DB_PASSWORD) {
    mongodbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ihvsaps.mongodb.net/?retryWrites=true&w=majority`
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