import { ProductDetail } from "@/componentes/product-datail";
import { stripe } from "@/lib/stripe";

export default async function ProdutosPage({
  params,
}: {
  params: { id: string };
}) {
  const products = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  return <ProductDetail product={products} />;  
}
