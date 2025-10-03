"use client";

import { addToCartAction } from "@/actions/cart/addToCart.action";
import { Button } from "@/components/ui";
import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function AddToCartBtn({ productId }: { productId: string }) {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleAddToCart() {
    setLoading(true);
    // const response = await addToCartAction(productId);
    toast.promise(addToCartAction(productId), {
      loading: "Loading...",
      success: (data) => {
        return `${data.message}`;
      },
      error: "Error on adding product to cart",
    });
    setLoading(false);
  }

  return (
    <Button
      // onClick={() => handleAddToCart()}
      // disabled={loading}
      className="w-full flex items-center justify-center gap-1 text-white bg-blue-600 hover:bg-blue-700 mb-3"
    >
      <ShoppingCart className="h-4 w-4" />
      <span>Add to Cart</span>
    </Button>
  );
}
