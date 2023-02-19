import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "next-auth/jwt";
import JWT from "jsonwebtoken";

const prisma = new PrismaClient();

const jwt_secret = process.env.JWT_SECRET;

export default async (req, res) => {
  const rawToken = await jwt.getToken({ req, secret: jwt_secret, raw: "true" });
  const options = {
    debug: true,
    // cookies: {
    //   csrfToken: {
    //     name: "next-auth.csrf-token",
    //     options: {
    //       httpOnly: true,
    //       sameSite: "none",
    //       path: "/",
    //       secure: true,
    //     },
    //   },
    //   pkceCodeVerifier: {
    //     name: "next-auth.pkce.code_verifier",
    //     options: {
    //       httpOnly: true,
    //       sameSite: "none",
    //       path: "/",
    //       secure: true,
    //     },
    //   },
    // },
    providers: [
      Providers.Facebook({
        clientId: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
      }),
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorizationUrl:
          "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
      }),
      Providers.Credentials({
        id: "credentials-login",
        name: "login",
        credentials: {
          email: { label: "email", type: "email", placeholder: "email" },
          password: { label: "password", type: "password" },
        },
        authorize: async (credentials) => {
          // get the user here and return a promise of it if found and null if not
          try {
            console.log(credentials);
            // return Promise.resolve(credentials)
            const user = await prisma.user.findUnique({
              where: {
                email: credentials?.email,
              },
              select: {
                email: true,
                name: true,
                firstname: true,
                lastname: true,
                city: true,
                country: true,
                password: true,
                id: true,
              },
            });
            if (!user) {
              console.log("not user !!!!!!!!!!!!!!!");
              return Promise.resolve(null);
            }
            // check the password and return the user if there is a match
            if (await bcrypt.compare(credentials?.password, user.password)) {
              return Promise.resolve(user);
            }
            return Promise.resolve(null);
          } catch (error) {
            console.log({ error });
            Promise.resolve(null);
          }
        },
      }),
      Providers.Credentials({
        id: "credentials-signup",
        name: "signup",
        credentials: {
          firstname: {
            label: "firstname",
            type: "text",
            placeholder: "jsmith",
          },
          lastname: { label: "lastname", type: "text", placeholder: "doe" },
          city: { label: "city", type: "text", placeholder: "Yaounde" },
          country: { label: "country", type: "text", placeholder: "Cameroun" },
          email: { label: "email", type: "email", placeholder: "email" },
          password: { label: "password", type: "password" },
        },
        authorize: async (credentials) => {
          const hashedPassword = await bcrypt.hash(credentials?.password, 12);
          // console.log({ credentials });
          const createdUser = await prisma.user.create({
            data: {
              email: credentials?.email,
              firstname: credentials?.firstname,
              lastname: credentials?.lastname,
              name: `${credentials?.firstname} ${credentials?.lastname}`,
              city: credentials?.city,
              country: credentials?.country,
              password: hashedPassword,
            },
          });
          // console.log({createdUser})
          return Promise.resolve({
            email: credentials?.email,
            firstname: credentials?.firstname,
            lastname: credentials?.lastname,
            city: credentials?.city,
            country: credentials?.country,
            name: createdUser.name,
            id: createdUser.id,
          });
        },
      }),
    ],
    secret: process.env.JWT_SECRET,
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      // we implement custom jwt sign and verification functions since the default behaviour causes issues with external APIs
      encode: async ({ secret, token, maxAge }) => {
        const encodedToken = JWT.sign(token, secret, { algorithm: "HS512" });

        return encodedToken;
      },
      decode: async ({ secret, token, maxAge }) => {
        const verify = JWT.verify(token, secret);

        return verify;
      },
    },
    adapter: Adapters.Prisma.Adapter({ prisma }),

    // set hasura and token info in the session and user info
    callbacks: {
      jwt: async (token, user: any, account, profile, isNewUser) => {
        console.log({
          jwt_callback: { token, user, account, profile, isNewUser },
        });
        if (user?.id) {
          console.log({ wehaveuserid: user?.id });
          if (profile) {
            // the user is from a Oauth provider like Google or Facebook create the user if we don't have one in the database
            token.userId = user?.id;
            token = { ...token, ...profile };
            const existingUser = await prisma.user.findUnique({
              where: { id: token.userId },
            });
            if (!existingUser) {
              const newCreatedUser = await prisma.user.create({
                data: {
                  email: token.email,
                  name: token.name,
                  image: token.picture,
                  firstname: token.given_name,
                  lastname: token.family_name,
                  id: token.userId,
                },
              });
              console.log({ newCreatedUser });
            }
          } else {
            token.userId = user.id;
          }
          token.api = {
            "X-Hasura-Allowed-Roles": ["editor", "user", "public"],
            "X-Hasura-Default-Role": "public",
            "X-Hasura-User-Id": user.userId,
            "X-Hasura-Org-Id": "ewatergate",
            "X-Hasura-Role": "user",
          };
        }
        // console.log({user, account, profile, isNewUser})
        return Promise.resolve(token);
      },
      session: async (session: any, user: any) => {
        console.log({
          session_callback: { session, user, usersession: session.user },
        });
        session.user.userId = user.userId;

        session.api = {
          "X-Hasura-Allowed-Roles": ["editor", "user", "public"],
          "X-Hasura-Default-Role": "public",
          "X-Hasura-User-Id": user.userId,
          "X-Hasura-Org-Id": "ewatergate",
          "X-Hasura-Role": "user",
        };
        session.rawToken = rawToken;
        user.api["X-Hasura-User-Id"] = user.userId;
        user.api["X-Hasura-Role"] = "user";

        // console.log({user, session})
        return Promise.resolve(session);
      },
      redirect: async (url, baseUrl) => {
        console.log({ url, baseUrl });
        return Promise.resolve(url);
      },
    },
  };

  return NextAuth(req, res, options);
};
