const express = require('express');
const session = require('express-session')
const path = require('path');
const app = express();
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017',
  databaseName:'keeptab2',
  collection: 'sessions'
});

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');

const database = require('./database/database');

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(session({
    secret:'super-secret',
    resave:false,
    saveUninitialized:false,
    store:store,
    cookie:{
        maxAge: 2 * 24 * 60 *60 *1000,
        sameSite:'lax'
    }
}))

const main = require('./routes/addingtab__route')

app.use('/',main)

let PORT = 127.0.0.1;

if(process.env.PORT) {
    PORT = process.env.PORT
}

database.runFunc().then(()=>{
    app.listen(PORT);
})
