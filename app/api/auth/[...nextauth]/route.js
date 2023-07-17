import clientPromise from "@/libs/mongodb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {MongoDBAdapter} from "@auth/mongodb-adapter";




const handler = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ],adapter: MongoDBAdapter(clientPromise),
  })
  
  export { handler as GET, handler as POST }
