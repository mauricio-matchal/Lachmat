import Link from "next/link" 
import { LogoWordmark } from "../brand/logo"

export function Header() {
    return (
        <>
            <header className="bg-white">
                <div className="h-20 max-w-[1240px] items-center px-12 grid grid-cols-[1fr_auto_1fr] mx-auto">
                    <Link href="/" aria-label="Página inicial" className="justify-self-start">
                        <LogoWordmark className="h-4 w-auto" />
                    </Link>
                    <div className="bg-red-50">
                        <span className="type-footnote text-ink/50">Buscar...</span>
                    </div>
                    <div className="bg-green-50 justify-self-end">
                        <span className="type-subbutton">0</span>
                    </div>
                </div>
            </header>
        </>
    )
}