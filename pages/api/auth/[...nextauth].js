import { HTTP_REQUEST_METHODS } from "@/constants/http";
import api from "@/utils/api";
import { createRequest } from "@/utils/http";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_HOST}/auth/session/me`;
    const response = await fetch(url, {
      method: HTTP_REQUEST_METHODS.POST,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(token.user),
    });

    if (response.ok) {
      console.log("Access Token is refreshed.");
      const session = await response.json();

      return {
        ...token,
        user: session.data,
      };
    }

    return null;
  } catch (error) {
    console.log("Error refreshing Access Token", error);
    return null;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        csrfToken: { label: "CSRF Token", type: "text" },
      },
      async authorize(credentials, req) {
        const { data: user, errors } = await createRequest(
          api.auth.session.login(),
          {
            email: credentials.email,
            password: credentials.password,
            csrfToken: credentials.csrfToken,
          }
        );

        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      if (Date.now() < new Date(token.user.accessTokenExpiration).getTime()) {
        console.log("Access Token is still valid.");
        return token;
      }

      console.log("Access Token is expired. Refreshing Access Token...");
      const newToken = await refreshAccessToken(token);

      return newToken;
    },

    async session({ token, session }) {
      if (token.user) {
        session.user = token.user;
      }

      return session;
    },
  },
  session: {
    maxAge: 60 * 60 * 24 * 30, // 30 days (Must be greater than or equal to refresh token expiration)
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

export default NextAuth(authOptions);
