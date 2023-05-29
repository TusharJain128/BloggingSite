const express = require("express");
const route = require("./route/route");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv').config()

app.use(express.json())

mongoose.set('strictQuery', true);
mongoose.connect(process.env.URL, {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/',route)

app.listen(process.env.PORT , function(){
    console.log('Express app running on port '+ (process.env.PORT))
})


