import Link from "next/link" 
import { LogoWordmark } from "../brand/logo"
import { SFSymbol } from "../icons/SFSymbol"
import { CartButton } from "./CartButton"

export function Header() {
    return (
        <>
            <header className="bg-white">
                <div className="h-20 max-w-[1320px] items-center px-12 grid grid-cols-[1fr_auto_1fr] mx-auto">
                    <Link href="/" aria-label="Página inicial" className="justify-self-start">
                        <LogoWordmark className="h-4 w-auto" />
                    </Link>
                    <div className="flex w-[300px] items-center justify-between self-stretch border-x border-ink/30 pl-4 pr-3 ">
                        <span className="type-footnote text-ink/50">Buscar...</span>
                        <SFSymbol name="magnifyingglass" className="text-base" />
                    </div>
                    <div className="flex items-center gap-1 justify-self-end">
                        <Link href="/admin" aria-label="Gestão de produtos" className="flex pl-3 py-2 pr-3">
                            <SFSymbol name="slider.horizontal.3" className="text-[19px]" />
                        </Link>
                        <CartButton />
                    </div>
                </div>
                <nav className="bg-black text-white ">
                    <ul className="flex flex-row gap-9 type-footnote max-w-[1320px] justify-center py-4 mx-auto">
                        <li><Link href="/new-arrivals">Lançamentos</Link></li>
                        <li><Link href="/deals">Ofertas</Link></li>
                        <li><Link href="/men">Masculino</Link></li>
                        <li><Link href="/women">Feminino</Link></li>
                        <li><Link href="/category/gym">Academia</Link></li>
                        <li><Link href="/category/running">Corrida</Link></li>
                        <li><Link href="/category/skateboarding">Skateboarding</Link></li>
                        <li><Link href="/category/casual">Casual</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}