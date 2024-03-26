const File = require("../models/File");

const cloudinary= require("cloudinary").v2

exports.fileUpload= (req, res)=>{
    try{
        const file= req.files.file;
        console.log(file);
        
        //directory
        const path= __dirname+"/files/"+Date.now()+"."+file.name.split(".").at(-1);

        file.mv(path, (e)=>{
            if(e)console.log("Error occured while uploading to local folder "+e);
            else{
                return res.json({
                    message: "File Uploaded successfully.",
                    success: true
                })
            }
        })

        
    }
    catch(e){
        console.log("Something went wrong: "+e);
    }
}

function isFileSupp(file, list){
    return list.includes(file);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options= {folder, resource_type: "auto"};
    if(quality) {
        options.quality= quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
// async function uploadFileToCloudinary(file, folder, quality){
//     const options= {folder, resource_type: "auto"};
//     if(quality) {
//         options.height= quality;
//         options.crop='scale'
//     }
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }

exports.imageUpload= async(req, res)=>{
    try{
        const {name, tags, email}= req.body;
        console.log(name, tags, email);
        const file= req.files.image;
        console.log(file);
        const supportedTypes= ["jpg", "jpeg", "png"];
        const currType= file.name.split(".").at(-1).toLowerCase();
        if( !isFileSupp(currType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }
        console.log("Working fine till supported");
        const response= await uploadFileToCloudinary(file, "imgUpload");
        console.log(response);
        const dBfile= await File.create({
            name, tags, email, imageUrl: response.secure_url
        })
        console.log("Entry created");
        console.log(dBfile);
        
        return res.status(200).json({
            success: true,
            url: response.secure_url,
            message: "Image uploaded successfully",
        })

    } catch(e){
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: e.message
        })
    }
}


exports.vdoUpload= async(req, res)=>{
    try{
        const {name, tags, email}= req.body;
        const file= req.files.vdo;
        
        const supportedTypes= ["mov", "mp4"];
        const currType= file.name.split(".").at(-1).toLowerCase();
        if( !isFileSupp(currType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }
        
        const response= await uploadFileToCloudinary(file, "vdoUpload");
        console.log(response);

        const dBfile= await File.create({
            name, tags, email, imageUrl: response.secure_url
        })
        console.log("Entry created");
        console.log(dBfile);
        
        return res.status(200).json({
            success: true,
            url: response.secure_url,
            message: "Vdo uploaded successfully",
        })

    } catch(e){
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }
}

exports.compressUpload= async(req, res)=>{
    try{
        const {name, tags, email}= req.body;
        const file= req.files.image;
        
        const supportedTypes= ["jpg", "jpeg", "png", "mov", "mp4"];
        const currType= file.name.split(".").at(-1).toLowerCase();

        if( !isFileSupp(currType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }
        
        const response= await uploadFileToCloudinary(file, "compressUpload", 50);
        console.log(response);

        const dBfile= await File.create({
            name, tags, email, imageUrl: response.secure_url
        })
        console.log("Entry created");
        console.log(dBfile);
        
        return res.status(200).json({
            success: true,
            url: response.secure_url,
            message: "Compressed Image uploaded successfully",
        })

    } catch(e){
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }
}
// exports.compressUpload= async(req, res)=>{
//     try{
//         const {name, tags, email}= req.body;
//         const file= req.files.image;
        
//         const supportedTypes= ["jpg", "jpeg", "png", "mov", "mp4"];
//         const currType= file.name.split(".").at(-1).toLowerCase();

//         if( !isFileSupp(currType, supportedTypes)){
//             return res.status(400).json({
//                 success: false,
//                 message: "File type not supported"
//             })
//         }
        
//         const response= await uploadFileToCloudinary(file, "compressUpload", 150);
//         console.log(response);

//         const dBfile= await File.create({
//             name, tags, email, imageUrl: response.secure_url
//         })
//         console.log("Entry created");
//         console.log(dBfile);
        
//         return res.status(200).json({
//             success: true,
//             url: response.secure_url,
//             message: "Compressed Image uploaded successfully",
//         })

//     } catch(e){
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong",
//         })
//     }
// }