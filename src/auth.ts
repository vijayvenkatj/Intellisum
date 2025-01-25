
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { connectToDb, modelUsers } from "./utils/gmail/dbfunctions";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
        authorization: {
            params: {
                access_type: "offline",
                prompt: "consent",
                scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.modify'
            },
        },
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ user }) {   
      await connectToDb();
      const Users = modelUsers();
      if(!Users.findOne({ email: user.email })){
        Users.insertMany([user])
      }
      return true;
    },
    async jwt({ token ,account, user }){
        if (account && user) {
            token.accessToken = account.access_token;
            token.idToken = account.id_token;
            token.user = user;
          }
          return token;
    },
    async session({ session, token }: any) {
        session.user.accessToken = token.accessToken;
        session.user.idToken = token.idToken;
        return session;
    }
  },
  session: {
    strategy: "jwt"
  }
})
