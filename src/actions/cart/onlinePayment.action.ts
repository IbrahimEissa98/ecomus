"use server";

import { getAccessToken } from "@/helpers/getToken";
import { PaymentOnlineResponseI, PaymentShippingAddressI } from "@/interfaces";

export async function onlinePaymentAction(
  cartId: string,
  shippingAdd: PaymentShippingAddressI
): Promise<PaymentOnlineResponseI> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" +
      cartId +
      "?url=https://ecomus-ochre.vercel.app/",
    {
      method: "POST",
      headers: {
        token: (await getAccessToken()) + "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: shippingAdd }),
    }
  ).then((res) => res.json());
}
