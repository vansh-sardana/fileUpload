const mongoose= require("mongoose");
require("dotenv").config();

exports.dbConnect= ()=>{
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("Database Connection established");
    }).catch((e)=>{
        console.log("Error in connecting to database");
        console.error(e);
        process.exit(1);
    })
}