"use client";
import { Button } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
// import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";

interface NavCartOrWishProps {
  items: number;
  icon: ReactNode;
  href: string;
  badgeVariant: "default" | "destructive" | "outline" | "secondary";
  isLoadingCart: boolean;
  isAuth: boolean;
}

export default function NavCartOrWish({
  items,
  icon,
  href,
  badgeVariant,
  isLoadingCart,
  isAuth,
}: NavCartOrWishProps) {
  // const session = useSession();
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="relative hidden md:flex"
    >
      <Link href={href}>
        {icon}
        {isAuth && (
          <Badge
            variant={badgeVariant}
            className="absolute -top-1 -right-1 h-4 w-4 p-0 min-w-0 flex items-center justify-center"
          >
            {isLoadingCart ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              items
            )}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
