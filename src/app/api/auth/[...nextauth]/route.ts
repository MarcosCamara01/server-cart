import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);

export { handler as GET, handler as POST };