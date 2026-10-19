import Stripe from "stripe";
import Image from "next/image";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <div>
      {product.images && product.images[0] && (
        <div className="relative h-60 w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
          />
        </div>
      )}

      <div>
        <h1> {product.name} </h1>
        {product.description && <p> {product.description} </p>}
        {price && price.unit_amount && (
            <p className="text-lg font-semibold text-gray-900">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
      </div>
    </div>
  );
};
