const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let mongodbURL = "mongodb+srv://karlarboiz:O2oaiaxkmIZj7huz@cluster0.ihvsaps.mongodb.net/?retryWrites=true&w=majority";
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

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://karlarboiz:<password>@cluster0.ihvsaps.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

module.exports = {
    runFunc: run,
    getDbFunc: getDb
}