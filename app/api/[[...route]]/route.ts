import { Hono } from "hono";
import { handle } from "hono/vercel";
import {
  authHandler,
  initAuthConfig,
  verifyAuth,
  getAuthUser,
} from "@hono/auth-js";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import { comparePassword } from "@/lib/bcrypt";
import prisma from "@/lib/prisma";
import { hc } from 'hono/client'
import document from "@/server/controller/document";
import auth from "@/server/controller/auth";
export const runtime = "nodejs";

const app = new Hono()

app.use(
  "*",
  initAuthConfig((c) => ({
    secret: process.env.AUTH_SECRET,
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
  }))
);

app.use("/api/auth/*", authHandler());

// app.use("/api/*", verifyAuth());

const routes = app.basePath('/api')
.route('/documents', document)
.route("/auth-user", auth)
  // .route("/messages", messagesRoute)
  // .route("/users", usersRoute)

export type AppType = typeof routes;

// app client

export const GET = handle(app);
export const POST = handle(app);
