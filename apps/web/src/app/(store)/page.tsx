import { CountdownTimer } from "@/components/home/CountdownTimer";

export default function StorePage() {
    return (
        <main className="mx-auto max-w-[1320px] max-w-5xl px-12">
            <div className="py-15">
                <h1 className="type-title-2 mb-6 text-center">Ofertas do dia</h1>
                <h3 className="font-condensed text-[19px] mb-2.5 font-extrabold text-center">OFERTA RELÂMPAGO</h3>
                <CountdownTimer />
            </div>
            {/* i will add products here later on */}
        </main>
    )
}