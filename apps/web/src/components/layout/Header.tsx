import Link from "next/link";
import { LogoWordmark } from "../brand/logo";
import { SFSymbol } from "../icons/SFSymbol";
import { CartButton } from "./CartButton";

export function Header() {
  return (
    <>
      <header className="sticky -top-17 z-50 bg-white">
        <div className="mx-auto grid h-17 max-w-[1360px] grid-cols-[1fr_auto_1fr] items-center px-12">
          <Link
            href="/"
            aria-label="Página inicial"
            className="justify-self-start"
          >
            <LogoWordmark className="h-4 w-auto" />
          </Link>
          <div className="flex w-[300px] items-center justify-between self-stretch border-x border-ink/30 pr-3 pl-4">
            <span className="type-footnote text-ink/50">Buscar...</span>
            <SFSymbol name="magnifyingglass" className="text-base" />
          </div>
          <div className="flex items-center gap-1 justify-self-end">
            <Link
              href="/admin"
              aria-label="Gestão de produtos"
              className="flex py-2 pr-3 pl-3"
            >
              <SFSymbol name="slider.horizontal.3" className="text-[19px]" />
            </Link>
            <CartButton />
          </div>
        </div>
        <nav className="bg-black text-white">
          <ul className="mx-auto flex max-w-[1360px] flex-row justify-center gap-9 py-4 type-footnote">
            <li>
              <Link href="/new-arrivals">Lançamentos</Link>
            </li>
            <li>
              <Link href="/deals">Ofertas</Link>
            </li>
            <li>
              <Link href="/men">Masculino</Link>
            </li>
            <li>
              <Link href="/women">Feminino</Link>
            </li>
            <li>
              <Link href="/category/gym">Academia</Link>
            </li>
            <li>
              <Link href="/category/running">Corrida</Link>
            </li>
            <li>
              <Link href="/category/skateboarding">Skateboarding</Link>
            </li>
            <li>
              <Link href="/category/casual">Casual</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
