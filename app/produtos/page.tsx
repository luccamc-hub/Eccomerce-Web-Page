import { stripe } from "@/lib/stripe";
import { ProductList, } from "@/componentes/product-list";

export default async function ProdutosPage() {
     const products = await stripe.products.list({
        expand: ["data.default_price"],
      });
    
    return (
        <div>
            <h1>Todos os Produtos</h1>
            <ProductList products={products.data} />
        </div>
    );
}