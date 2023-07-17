"use client";


import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";


export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
}) {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProduct, setGoToProduct] = useState(false);
  const [imageUrl,setImageUrl] = useState(null)


  const handleUpload = async (e) => {
    
      try {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
  
        const response = await axios.post('/api/upload', formData);
  
        const { imageUrl } = response.json();
        console.log(imageUrl)
        setImageUrl(imageUrl);
      
      } catch (error) {
        console.error(error);
      }
  };





    
      
     


  const saveProduct = async (e) => {
    e.preventDefault();

    const data = { title, description, price };
    if (_id) {
      await axios.patch(`/api/products/${productId}`, { ...data, _id });
    } else {
      await axios.post("/api/products", data);

    }
    setGoToProduct(true);
  };

  if (goToProduct) {
    router.push("/products");
  }

  
  
  

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Photos</label>
      <div className="mb-2">
        <label className="w-28 h-28  text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>
            Upload
            </div>
          <input
            onChange={handleUpload}
            type="file"
            name=""
            className="hidden"
          />
        </label>
        {imageUrl && <img src={imageUrl} alt="Upload-Image"/>}
        {!images?.length && <div>No Photos in this product</div>}
      </div>
      <label>Description</label>
      <textarea
        value={description}
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label>Price(in USD)</label>
      <input
        value={price}
        type="number"
        placeholder="price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
};
