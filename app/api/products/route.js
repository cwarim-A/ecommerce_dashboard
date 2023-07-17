import { mongooseConnect } from "@/libs/mongoose";
import {Product} from "@/models/Product";

export const POST = async (request)=>{
    const { title,description,price } = await request.json();
    try {
        await mongooseConnect();
        const newProduct =  Product.create({ title,description,price });

        return new Response(JSON.stringify(newProduct), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new product", { status: 500 });
    }
}
export const GET = async (request)=>{
    
    try {
        await mongooseConnect()

        const products = await Product.find();

        return new Response(JSON.stringify(products), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all products", { status: 500 });
    }
}

// export default async function handle(req, res) {
//   const {method} = req;
//   await mongooseConnect();
// //   await isAdminRequest(req,res);

// //   if (method === 'GET') {
// //     if (req.query?.id) {
// //       res.json(await Product.findOne({_id:req.query.id}));
// //     } else {
// //       res.json(await Product.find());
// //     }
// //   }

//   if (method === 'POST') {
//     const {title,description,price} = req.body;
//     const productDoc = await Product.create({
//       title,description,price
//     })
//     res.json(productDoc);
//   }

// //   if (method === 'PUT') {
// //     const {title,description,price,images,category,properties,_id} = req.body;
// //     await Product.updateOne({_id}, {title,description,price,images,category,properties});
// //     res.json(true);
// //   }

// //   if (method === 'DELETE') {
// //     if (req.query?.id) {
// //       await Product.deleteOne({_id:req.query?.id});
// //       res.json(true);
// //     }
// //   }
// }