import { Product } from "@/models/Product";
import { mongooseConnect } from "@/libs/mongoose";



export const GET = async (request,{params}) => {
    try {
      await mongooseConnect();
  
      const aProduct = await Product.findById(params.id)
      if(!aProduct) return new Response("product not found", {status:404})
  
      return new Response(JSON.stringify(aProduct), { status: 200 });
    } catch (error) {
      return new Response("Failed to fetch all product", { status: 500 });
    }
  };
  
  export const PATCH = async (request, { params }) => {
    const { title,description,price } = await request.json();
  
    try {
        await mongooseConnect();
  
        // Find the existing product by ID
        const existingProduct = await Product.findById(params.id);
  
        if (!existingProduct) {
            return new Response("Product not found", { status: 404 });
        }
  
        // Update the product with new data
        existingProduct.title = title;
        existingProduct.description = description;
        existingProduct.price = price;
  
        await existingProduct.save();
  
        return new Response("Successfully updated the Product", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Product", { status: 500 });
    }
  };

  export const DELETE = async(request,{params})=>{
    try {
        await mongooseConnect();
    
        const oneProduct = await Product.findByIdAndRemove(params.id)
        
    
        return new Response("Product Deleted successfully", { status: 200 });
      } catch (error) {
        return new Response("Failed to delete product", { status: 500 });
      }
}