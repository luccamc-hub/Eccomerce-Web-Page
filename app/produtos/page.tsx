import { Suspense } from "react";
import { connection } from "next/server";
import { stripe } from "@/lib/stripe";
import { ProductList } from "@/componentes/product-list";

async function Produtos() {
  await connection();

  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return <ProductList products={products.data} />;
}

export default function ProdutosPage() {
  return (
    <div>
      <h1>Todos os Produtos</h1>
      <Suspense fallback={<p>Carregando produtos...</p>}>
        <Produtos />
      </Suspense>
    </div>
  );
}