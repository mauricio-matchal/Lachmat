import Link from "next/link";
import { siFacebook, siInstagram, siYoutube, type SimpleIcon } from "simple-icons";
import { LogoSymbol } from "@/components/brand/logo";
import { Marquee } from "@/components/layout/Marquee";

function SocialIcon({ icon, href }: { icon: SimpleIcon; href: string }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={icon.title}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
                <path d={icon.path} />
            </svg>
        </a>
    )
}

export function Footer() {
    return (
        <>
            <footer className="bg-surface pt-2">
                <Marquee text="#LACHMAT.COM.BR" />
                <div className="flex flex-col gap-10 max-w-[1320px] px-12 py-7 mx-auto">
                    <div className="grid grid-cols-[auto_1fr_auto] gap-14">
                        <div className="flex flex-col gap-1.5">
                            <h2 className="type-footnote pb-1">Encontre nossas lojas</h2>
                            <ul className="flex flex-col gap-1.5">
                                <li><Link href="/newsletter" className="type-subfootnote block">Cadastre-se para receber novidades</Link></li>
                                <li><Link href="/gift-card" className="type-subfootnote block">Cartão presente</Link></li>
                                <li><Link href="/sitemap" className="type-subfootnote block">Mapa do site</Link></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <h2 className="type-footnote pb-1">Ajuda</h2>
                            <ul className="flex flex-col gap-1.5">
                                <li><Link href="/help" className="type-subfootnote block">Dúvidas gerais</Link></li>
                                <li><Link href="/help/sizes" className="type-subfootnote block">Encontre seu tamanho</Link></li>
                                <li><Link href="/help/shipping" className="type-subfootnote block">Entregas</Link></li>
                                <li><Link href="/help/returns" className="type-subfootnote block">Devoluções</Link></li>
                                <li><Link href="/corporate" className="type-subfootnote block">Corporativo</Link></li>
                                <li><Link href="/contact" className="type-subfootnote block">Fale conosco</Link></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h2 className="type-footnote">Redes sociais</h2>
                            <ul className="flex flex-row gap-7">
                                <li><SocialIcon icon={siFacebook} href="https://www.facebook.com" /></li>
                                <li><SocialIcon icon={siInstagram} href="https://www.instagram.com" /></li>
                                <li><SocialIcon icon={siYoutube} href="https://www.youtube.com" /></li>
                            </ul>
                        </div>
                    </div>
                    <Link href="/" aria-label="Página inicial" className="self-start">
                        <LogoSymbol className="h-8 w-auto" />
                    </Link>
                    <div className="flex flex-row justify-between items-center">
                        <ul className="flex flex-row gap-4">
                            <li><Link href="/" className="type-subfootnote block">Brasil</Link></li>
                            <li><Link href="/privacy" className="type-subfootnote block">Política de Privacidade</Link></li>
                            <li><Link href="/cookies" className="type-subfootnote block">Política de Cookies</Link></li>
                            <li><Link href="/terms" className="type-subfootnote block">Termos de Uso</Link></li>
                        </ul>
                        <address className="type-footnote text-end not-italic">
                            © {new Date().getFullYear()} Lachmat. Todos os direitos reservados. CNPJ: XX.XXX.XXX / XXXX-XX
                            <br />Endereço - CEP XXXXX-XXX - Salvador - BA
                        </address>
                    </div>
                </div>
            </footer>
        </>
    )
}