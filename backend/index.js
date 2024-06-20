const express=require('express')
const app=express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT=process.env.PORT||5000;
app.use(express.json());

const db=()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB  Connection is Successful"))
    .catch( (error) => {
        console.log("Issue in DB Connection");
        console.error(error.message);
        process.exit(1);
    } );
}
db();
const route=require("./routes/teacher");
app.use("/teacher",route);
app.listen(PORT,()=>{
    console.log("App is listeneing in PORT",PORT);} )
app.get("/",(req,res)=>{
    res.send( "<h1>Hello</h1>");
})



