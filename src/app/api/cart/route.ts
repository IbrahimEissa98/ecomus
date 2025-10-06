import { getAccessToken } from "@/helpers/getToken";
import { GetCartApiResponse } from "@/Types";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getAccessToken();

  // if (!token) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const response: GetCartApiResponse = await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      method: "GET",
      headers: {
        token,
      },
    }
  ).then((res) => res.json());
  return NextResponse.json(response);
}
