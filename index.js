//instantiate express server
const express=require("express");
const app= express();

//port
require("dotenv").config();
const PORT= process.env.PORT || 4000;

//middleware
app.use(express.json());

const expressFileUpload= require("express-fileupload");
app.use(expressFileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    limits: {
        fileSize: 10000000 //10mb
    },
    abortOnLimit: true
}) );

//mounting the routes
const fileUploadRoutes= require("./routes/FileUpload");
app.use("/api/v1/upload/", fileUploadRoutes);

//connect to db
const {dbConnect}= require("./config/database");
dbConnect();

//connect to cloudinary
const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

//activate the server
app.listen(PORT, ()=>{
    console.log(`I am listening at port ${PORT}`);
})