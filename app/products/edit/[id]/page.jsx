"use client"
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter,useParams } from "next/navigation";
import { useEffect,useState } from "react";

export default function EditProductPage(){
  const[productInfo,setProductInfo] = useState(null)
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
//   const Id = params.id
// console.log(productId)
  useEffect(()=>{
    // if(!productId){
    //     return;
    // }
    // console.log(productId)
    axios.get(`/api/products/${productId}`).then(
        response=>{
            console.log(response.data)
           setProductInfo(response.data)
        }
    )
  },[productId])
    return(
        <Layout>
            <h1>Edit Product</h1>
            {productInfo && (
              <ProductForm {...productInfo} />
            )}
        </Layout>
    )
}