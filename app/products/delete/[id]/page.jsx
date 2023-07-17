"use client"
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter,useParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function DeleteProductPage(){
    const router = useRouter();
    const params = useParams();
    const [productInfo,setProductInfo] = useState()
    const productId = params.id
    useEffect(()=>{
        if(productId){
            return;
        }
        axios.get(`/api/products/${productId}`).then(response=>{
            console.log(response.data)
          setProductInfo(response.data) 
        })
    },[])
    const goBack = ()=>{
        router.push("/products")
    }
    const deleteProduct = async ()=>{
       await axios.delete(`/api/products/${productId}`);
       goBack()
       
    }
    return(
        <Layout>
            <h1 className="text-center">Do You really want to delete &nbsp;{productInfo?.title} </h1>
            <div className="flex gap-2 justify-center">
            <button
            onClick={deleteProduct} className="btn-red">Yes</button>
            <button className="btn-default" onClick={goBack}>NO</button>
            </div>
        </Layout>
    )
}