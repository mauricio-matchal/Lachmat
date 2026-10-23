import type { Product } from "@/lib/api";
import { formatPrice, calculateDiscountPercentage } from "@/lib/price";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.images[0];

  return (
    <article className="flex w-[330px] flex-col gap-4 bg-surface p-3.5">
      <Link href={`/${product.slug}/p`} className="flex flex-col gap-3.5">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`${product.line.name} - ${product.colorName}`}
            width={1920}
            height={1920}
            sizes="330px"
            className="aspect-square w-full object-cover mix-blend-darken"
          />
        )}
        <div className="-mb-1.5 flex flex-col">
          <h2 className="type-body">{product.line.name}</h2>
          <p className="type-subbody">{product.line.category.name}</p>
        </div>

        <div>
          <s className="type-button text-ink opacity-60">
            {formatPrice(product.price)}
          </s>
          <div className="flex flex-row items-end gap-3">
            <p className="type-title-3">
              {formatPrice(product.promoPrice ?? product.price)}
            </p>
            {product.promoPrice && (
              <p className="font-condensed font-black text-discount">
                {calculateDiscountPercentage(product.price, product.promoPrice)}
                % OFF
              </p>
            )}
          </div>
        </div>
      </Link>
      {/* for now a button, later create a component for that */}
      <button className="bg-muted-button py-2.5 type-subbutton">
        Adicionar ao carrinho
      </button>
    </article>
  );
}
