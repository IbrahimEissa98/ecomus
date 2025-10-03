import { UserResponse } from "@/interfaces/login";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserResponse;
  }

  interface User {
    user: UserResponse;
    token: string;
  }
}

import { JWT as DefaultJwt } from "next-auth/jwt";
import { User } from "next-auth";
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends User {
    user;
  }
  // interface JWT extends DefaultJwt {
  //   user: User;
  // }
}
