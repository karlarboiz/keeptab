const express = require('express');
const path = require('path');
const app = express();

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');

const database = require('./database/database');

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())


const main = require('./routes/addingtab__route')

app.use('/',main)

let PORT = 3000 ;

if(process.env.PORT) {
    PORT = process.env.PORT
}
database.runFunc()
.then(()=>{
    app.listen(PORT);
}).catch(function() {
        console.log("Connecting to the database failed")
})