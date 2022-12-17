import {  firebaseConfig } from './../../../firebase';
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    adapter: FirestoreAdapter(firebaseConfig),
    callbacks: {
        async session({ session, user }) {
            session.user.id = user?.id
            
            return session 
        }
    },
    secret: "1Eku1dVFCnTJGRlmXEbKQINVz4XHqQsNrfYCHlrevKg="},
)
