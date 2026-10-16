"use client";

import Link from "next/link";
import { SFSymbol } from "../icons/SFSymbol";
import { usePathname } from "next/navigation";

export function CartButton() {
  const pathname = usePathname();
  const isActive = pathname === "/cart";

  return (
    <Link
      href="/cart"
      aria-label="Carrinho"
      className={`flex items-center gap-1.5 py-2 pr-3 pl-3 ${isActive ? "bg-input" : ""}`}
    >
      <SFSymbol name="bag" className="text-[19px]" />
      <span className="font-condensed text-[19px] font-semibold">0</span>
    </Link>
  );
}
