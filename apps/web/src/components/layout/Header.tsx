import Link from "next/link" 
import { LogoWordmark } from "../brand/logo"
import { SFSymbol } from "../icons/SFSymbol"

export function Header() {
    return (
        <>
            <header className="bg-white">
                <div className="h-20 max-w-[1240px] items-center px-12 grid grid-cols-[1fr_auto_1fr] mx-auto">
                    <Link href="/" aria-label="Página inicial" className="justify-self-start">
                        <LogoWordmark className="h-4 w-auto" />
                    </Link>
                    <div className="flex h-8 w-[300px] items-center justify-between border-x border-input pl-4 pr-3">
                        <span className="type-footnote text-ink/50">Buscar...</span>
                        <SFSymbol name="magnifyingglass" className="text-base" />
                    </div>
                    <div className="flex items-center gap-1 justify-self-end">
                        <Link href="/admin" aria-label="Gestão de produtos" className="flex size-12 items-center justify-center">
                            <SFSymbol name="slider.horizontal.3" className="text-[19px]" />
                        </Link>
                        <Link href="/cart" aria-label="Carrinho" className="flex h-12 items-center gap-1.5 px-3">
                            <SFSymbol name="bag" className="text-[19px]" />
                            <span className="font-condensed text-[19px] font-semibold">0</span>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    )
}