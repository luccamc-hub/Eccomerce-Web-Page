import { Suspense } from "react";
import { connection } from "next/server";
import { ProductDetail } from "@/componentes/product-detail";
import { stripe } from "@/lib/stripe";

async function Produto({ params }: { params: Promise<{ id: string }> }) {
  await connection();

  const { id } = await params;
  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductDetail product={plainProduct} />;
}

export default function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p>Carregando produto...</p>}>
      <Produto params={params} />
    </Suspense>
  );
}