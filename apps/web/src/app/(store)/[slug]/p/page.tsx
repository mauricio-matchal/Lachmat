import { getProductBySlug } from "@/lib/api";
import { calculateDiscountPercentage, formatPrice } from "@/lib/price";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { StarRating } from "@/components/product/StarRating";
import BackButton from "@/components/layout/BackButton";

export default async function ProductPage({ params }: PageProps<"/[slug]/p">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const salePrice = product.promoPrice ?? product.price;
  const pixPrice = product.pixPrice ?? salePrice;

  const colors = product.line.products;

  return (
    <article className="mx-auto flex max-w-[1320px] flex-col gap-10 py-8">
      <BackButton />

      <div className="flex flex-row gap-10">
        {/* sticks below the header's black bar (53px) + the same 28px as mt-7, until the gallery ends */}
        <div className="sticky top-[81px] mt-7 flex w-[420px] shrink-0 flex-col gap-5 self-start">
          {/* descrição do produto */}
          <header className="flex flex-col gap-3">
            <h1 className="type-title text-[22px]">{product.line.name}</h1>
            <div className="flex flex-row gap-4">
              <p className="type-body">{product.line.category.name}</p>
              <p className="type-subbody">{product.sku}</p>
            </div>
            <div className="flex flex-row items-end gap-4">
              <StarRating rating={3.8} />
              <button className="type-subbutton">
                Ver todas as 6 avaliações
              </button>
            </div>
          </header>
          {/* preço */}
          <div className="flex flex-col gap-1.5">
            {product.promoPrice !== null && (
              <s className="type-body opacity-60">
                {formatPrice(product.price)}
              </s>
            )}
            {/* no pix */}
            <h2 className="flex items-baseline gap-4">
              <span className="type-body text-[18px] font-medium">
                {formatPrice(pixPrice)} no Pix
              </span>
              {pixPrice < product.price && (
                <span className="font-condensed text-[16px] font-black text-discount">
                  {calculateDiscountPercentage(product.price, pixPrice)}% OFF
                </span>
              )}
            </h2>
            {/* preço normal */}
            <p className="flex items-baseline gap-3.5">
              <span className="type-caption">
                ou {formatPrice(salePrice)} em até 3x sem juros
              </span>
              {product.promoPrice !== null && (
                <span className="font-condensed text-[14px] font-black text-discount">
                  {calculateDiscountPercentage(product.price, salePrice)}% OFF
                </span>
              )}
            </p>
          </div>
          {/* cores */}
          <nav aria-label="Cores">
            <ul className="flex flex-wrap gap-2 pt-4 pb-7">
              {colors.map((color) => {
                const isCurrent = color.slug === product.slug;
                return (
                  <li key={color.slug}>
                    <Link
                      href={`/${color.slug}/p`}
                      className="relative block size-19 border border-ink/20 aria-[current=page]:border-ink"
                      aria-current={isCurrent ? "page" : undefined}
                    >
                      <Image
                        src={color.images[0]}
                        alt={color.colorName}
                        width={76}
                        height={76}
                        sizes="76px"
                        className="size-full object-cover"
                      />
                      {isCurrent && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 flex items-center justify-center bg-ink/30 text-center type-subbutton text-[16px] font-bold text-white uppercase"
                        >
                          {color.colorName}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          {/* frete de entrega */}
          <h3 className="type-body">Calcule o frete e entrega</h3>
          {/* TO DO: FAZER OS COMPONENTES DE FORM E COLOCAR AQUI E ESCOLHA UM TAMANHO TAMBEM */}
          <div className="grid grid-cols-2 gap-2.5">
            <button className="bg-ink py-3 type-footnote text-[18px] text-white">
              Comprar agora
            </button>
            <button className="bg-surface py-3 type-footnote text-[18px]">
              Adicionar ao carrinho
            </button>
          </div>
        </div>
        {/* galeria: fotos com a mesma largura; a foto em hover fica mais larga.
          O espaço entre as fotos é uma borda transparente, e não um gap: assim
          não há um vão sem hover entre elas, e a animação não "pisca" */}
        <div className="-mx-1 flex h-[808px] flex-1">
          {product.images.map((image, index) => (
            <Image
              unoptimized
              key={image}
              src={image}
              alt={`${product.line.name} ${product.colorName}, foto ${index + 1} de ${product.images.length}`}
              width={1920}
              height={1920}
              sizes="808px"
              loading="eager"
              quality={90}
              className="h-full min-w-0 flex-1 border-x-4 border-transparent object-cover transition-[flex-grow] duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] hover:flex-[3] hover:cursor-pointer motion-reduce:transition-none"
            />
          ))}
        </div>
      </div>
    </article>
  );
}
