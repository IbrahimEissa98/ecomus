import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
// : Promise<string | undefined>
export async function getAccessToken() {
  const sessionCookies = await cookies();
  const codedToken =
    sessionCookies.get("__Secure-next-auth.session-token")?.value ||
    sessionCookies.get("next-auth.session-token")?.value;
  const accessToken = await decode({
    token: codedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return accessToken?.token as string;
}
