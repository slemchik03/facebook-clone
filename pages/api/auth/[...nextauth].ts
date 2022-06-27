import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
], secret: "1Eku1dVFCnTJGRlmXEbKQINVz4XHqQsNrfYCHlrevKg="})
