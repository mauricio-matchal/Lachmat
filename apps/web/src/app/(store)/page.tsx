import { CountdownTimer } from "@/components/home/CountdownTimer";

export default function StorePage() {
  return (
    <main className="mx-auto max-w-5xl max-w-[1320px] px-12">
      <div className="py-15">
        <h1 className="mb-6 text-center type-title-2 text-[26px]">
          Ofertas do dia
        </h1>
        <h3 className="mb-2.5 text-center font-condensed text-[18px] font-extrabold">
          OFERTA RELÂMPAGO
        </h3>
        <CountdownTimer />
      </div>
      {/* i will add products here later on */}
    </main>
  );
}
