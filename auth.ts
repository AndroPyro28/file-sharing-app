import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./lib/prisma";
import NextAuth from "next-auth";
import { comparePassword } from "./lib/argon";

const authOptions = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
        type: { label: "type", type: "text" },
      },
      async authorize(credentials) {
        /* 
        You need to provide your own logic here that takes the credentials
        submitted and returns either a object representing a user or value
        that is false/null if the credentials are invalid.
        e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        You can also use the `req` object to obtain additional parameters
        (i.e., the request IP address) 
      */

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials. Please fill in all fields");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }
        // hashPassword
        const isCorrectPassword = await comparePassword(
          credentials.password as string,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        //   if (
        //     (credentials.type === "sms" && user.role === "STOCK_MANAGER") ||
        //     (credentials.type === "mediwise" && user.role !== "STOCK_MANAGER")
        //   ) {
        return user;
        //   }

        // return { ...user, role: user.role.toString() };
        /* 
        If no error and we have user data, return it
        Return null if user data could not be retrieved
      */
      },
    }),
  ],
});

export default authOptions;

export const { auth, handlers, signIn, signOut } = authOptions;
