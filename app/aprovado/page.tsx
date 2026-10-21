"use client";

import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { useEffect } from "react";

export default function AprovadoPage() {
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Pagamento Aprovado!</h1>
      <p className="mb-4">
        Obrigado por sua compra! Seu pedido esta sendo processado.
      </p>
      <Link href="/produtos" className="text-blue-600 hover:underline">
        Continue comprando
      </Link>
    </div>
  );
}