import Image from "next/image";
import styles from "./page.module.css";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/componentes/carousel";
import { connection } from "next/server";

export const instant = false;

export default async function Home() {
  await connection();

  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div>
      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Bem-vindo à nossa loja!
            </h2>
            <p className="text-neutral-600">
              Descubra uma variedade de produtos de alta qualidade, cuidadosamente selecionados para atender às suas necessidades. Explore nossa coleção e encontre exatamente o que você procura.
            </p>
            <Button
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
            >
              <Link
                href="/produtos"
                className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >
                Navegar Por Todos os Produtos
              </Link>
            </Button>
          </div>
          <Image
            alt="Hero Image"
            src={products.data[0].images[0]}
            className="rounded"
            width={450}
            height={450}
          />
        </div>
      </section>
      <section className="py-8">
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
