import {v2 as cloudinary} from "cloudinary";
import formidable from "formidable"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  secure:true,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const config = {
    api: {
      bodyParser: false,
    },
  };
  

  export const POST = async (req) => {
    try {
      const formData = await req.formData();
      const File = formData.get("file") ;
      console.log(File)
      const result = await cloudinary.uploader.upload(File);
      const imageUrl = result.secure_url;
      return new Response(JSON.stringify(imageUrl), { status: 201 });
    } catch (error) {
      console.error(error);
      return new Response("Failed to upload image to cloudinary", { status: 400 });
    }
  };
  

// export const POST = async (request) => {
//     try {
//       const file = await request.json();
//       const uploadResult = await cloudinary.uploader.upload(file);
  
//       const imageUrl = uploadResult.secure_url;
//       return new Response(JSON.stringify(imageUrl), { status: 201 });
//     } catch (error) {
//       console.error(error);
//       return new Response("Failed to upload file", { status: 500 });
//     }
//   };

// const handler = async (req,res)=>{
//     try {
//         const file = await new Promise((resolve,reject)=>{
//             const form = formidable();
//             form.parse(req,(err,fields,files)=>{
//                 if(err) return reject(err);
//             });
//             form.on("file",(formName, file)=>{
//                 resolve(file)
//             });
//         });
//         const data = await cloudinary.upload.unsigned_upload(
//             file.filepath,
//             process.env.UPLOAD_PRESET
//         );
//         res.status(200).json({fileUrl: data.secure_url})
//     } catch(error){
//         console.error(error);
//         res.status(500).json({message:"server upload error"})
//     }
// }


// export {handler as POST,handler as GET}
  