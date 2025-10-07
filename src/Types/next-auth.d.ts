import { UserResponse } from "@/interfaces/login";
import { JWT as DefaultJWT } from "next-auth/jwt";
// import { User } from "next-auth";
import NextAuth, { DefaultSession, User } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserResponse;
  }

  interface Session {
    user: {
      /** The user's postal address. */
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    // role: string;
    user: UserResponse;
    token: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  // interface JWT extends User {}
  interface JWT extends DefaultJWT {
    user: UserResponse;
  }
}

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT extends DefaultJWT {
//     /** OpenID ID Token */
//     user: User;
//     // idToken?: string;
//     // token: string;
//   }
// }
