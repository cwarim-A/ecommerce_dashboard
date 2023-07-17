"use client"
import Layout from "@/components/Layout"
import Nav from "@/components/Nav"
import { useSession, signIn, signOut,getProviders } from "next-auth/react"
import { useEffect,useState} from "react"

export default function Home() {
   const{data:session} = useSession();
   
return(
  <Layout>
    <div className="text-blue-900 flex justify-between">
       <h1> Hello, <strong>{session?.user?.name}</strong></h1>
       <div className="flex bg-gray-300 text-black gap-1 rounded-lg overflow-hidden">
       <img src={session?.user?.image} alt="Profile-Picture" className="w-8 h-8 "/>
       <span className=" px-2"> {session?.user?.name} </span>
       
       </div>
    </div>
  </Layout>
)
  
  
}
