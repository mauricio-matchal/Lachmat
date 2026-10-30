import { getProductBySlug } from "@/lib/api";
import { calculateDiscountPercentage, formatPrice } from "@/lib/price";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { StarRating } from "@/components/product/StarRating";
import BackButton from "@/components/layout/BackButton";
import { Button } from "@/components/ui/button";
import { SizeSelector } from "@/components/product/SizeSelector";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import ProductGallery from "@/components/product/ProductGallery";

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
        <div className="mt-7 flex w-[420px] shrink-0 flex-col gap-10 self-end">
          <div className="flex flex-col gap-7">
            {/* descrição do produto */}
            <header className="flex flex-col gap-3">
              <h1 className="type-title text-[22px]">{product.line.name}</h1>
              <div className="flex flex-row gap-4">
                <p className="type-body">{product.line.category.name}</p>
                <p className="type-subbody">{product.sku}</p>
              </div>
              <div className="flex flex-row items-end gap-4">
                <StarRating rating={3.8} />
                <Button variant="link" size="sm">
                  Ver todas as 6 avaliações
                </Button>
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
          </div>

          {/* cores */}
          <nav aria-label="Cores">
            <ul className="flex flex-wrap gap-2">
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
          <div className="flex flex-col gap-4">
            <h3 className="type-body">Calcule o frete e entrega</h3>
            <InputGroup>
              <InputGroupInput placeholder="Seu CEP" mask="cep" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton>Calcular o frete</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <Button variant="ghost" className="-mt-2 self-start px-2 text-base">
              Não sei meu CEP
            </Button>
          </div>

          {/* tamanho + botões de compra: o bloco da compra, um pouco mais afastado do resto */}
          <div className="flex flex-col gap-12">
            {/* escolha de tamanhos */}
            <div className="flex flex-col gap-4">
              <h3 className="type-body">Escolha um tamanho</h3>
              <SizeSelector sizes={product.sizes} />
              <Button
                variant="ghost"
                className="-mt-2 self-start px-2 text-base"
              >
                Guia de tamanhos...
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Button>Comprar agora</Button>
              <Button variant="secondary">Adicionar ao carrinho</Button>
            </div>
          </div>
        </div>

        <ProductGallery
          images={product.images}
          name={`${product.line.name} ${product.colorName}`}
        />
      </div>
    </article>
  );
}
