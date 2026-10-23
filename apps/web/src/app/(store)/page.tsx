import { CountdownTimer } from "@/components/home/CountdownTimer";
import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/lib/api";

export default async function StorePage() {
  const products = await getProducts();

  return (
    <main className="mx-auto flex max-w-[1360px] flex-col gap-12 p-12">
      <div className="">
        <h1 className="mb-4 text-center type-title-2 text-[26px]">
          Ofertas do dia
        </h1>
        <h3 className="mb-2.5 text-center font-condensed text-[18px] font-extrabold">
          OFERTA RELÂMPAGO
        </h3>
        <CountdownTimer />
      </div>
      <div className="flex flex-row justify-center gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
