import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook"

export default NextAuth({providers: [
    FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET
    })
], secret: "1Eku1dVFCnTJGRlmXEbKQINVz4XHqQsNrfYCHlrevKg="})
