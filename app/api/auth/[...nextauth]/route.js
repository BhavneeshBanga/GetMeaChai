import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import mongoose from "mongoose"
import User from "@/models/User";
import Payment from '@/models/Payment';
import connectDB from "@/db/connectDb";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github") {
        // const client = await mongoose.connect("mongodb://localhost:27017/chai")

        //check if the user already exists in the database
        const currentUser = await User.findOne({ email: user.email })
        if (!currentUser) {
          //create new usesr
          const newUser = new User({
            email: user.email,
            username: user.email.split("@")[0],
            name: user.name,
            profilepic: user.image
          })
          await newUser.save()
          
        }
      }
      return true
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({email: session.user.email})
      console.log(dbUser);
      
      session.user.name = dbUser.username
      return session
    },
  }
})

export { handler as GET, handler as POST }