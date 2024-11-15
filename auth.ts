import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
// Prisma Adapter
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

const providers: Provider[] = [
  // Credentials({
  //   credentials: {
  //     email: {},
  //     password: {},
  //   },
  //   authorize: async (credentials) => {
  //     let user = { name: "Paul", email: "paul.levent@sciencespo.fr" };

  //     // logic to salt and hash password
  //     // const pwHash = saltAndHashPassword(credentials.password)

  //     // logic to verify if the user exists
  //     // user = await getUserFromDb(credentials.email, pwHash)

  //     if (!user) {
  //       // No user found, so this is their first attempt to login
  //       // Optionally, this is also the place you could do a user registration
  //       throw new Error("Invalid credentials.");
  //     }

  //     // return user object with their profile data
  //     return user;
  //   },
  // }),
  GitHub,
  Google,
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});
// .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  pages: { signIn: "/sign-in" },
});
