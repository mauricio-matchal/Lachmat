import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SFSymbol } from "@/components/icons/SFSymbol";
import { Input } from "@/components/ui/input";
import { SizeSelector } from "@/components/product/SizeSelector";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupRequired,
} from "@/components/ui/input-group";

const variants = [
  "default",
  "secondary",
  "muted",
  "accent",
  "inverse",
  "link",
  "ghost",
] as const;

// background each variant is meant to sit on
const backgrounds: Partial<Record<(typeof variants)[number], string>> = {
  muted: "bg-surface p-6",
  inverse: "bg-ink p-6",
};

// "text" only makes sense for the variants without a box
// every size in the Figma, in shuffled order to show the sorting; G is sold out
const sampleSizes = ["XG", "M", "PP", "GGG", "P", "G", "GG"].map((name) => ({
  id: name,
  name,
  stock: name === "G" ? 0 : 5,
}));

const sizesFor = (variant: (typeof variants)[number]) =>
  variant === "link" || variant === "ghost"
    ? (["default", "sm", "text"] as const)
    : (["default", "sm"] as const);

const Example = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-3">
    <p className="type-caption text-ink/50">{label}</p>
    {children}
  </div>
);

const ComponentsPage = () => {
  return (
    <main className="w-full px-10 py-12">
      <Link href="/design" className="type-footnote">
        Design system
      </Link>
      <h1 className="mt-2 mb-10 type-title">Componentes</h1>

      {/* one column per component, side by side in the order they were added */}
      <div className="flex flex-row flex-wrap items-start gap-16">
        <section className="flex flex-col gap-8">
          <h2 className="type-title-3">Button</h2>

          {variants.map((variant) => (
            <div key={variant} className="flex flex-col gap-3">
              <p className="type-caption text-ink/50">
                <code>variant=&quot;{variant}&quot;</code>
              </p>
              <div
                className={`flex flex-wrap items-center gap-4 ${backgrounds[variant] ?? ""}`}
              >
                {sizesFor(variant).map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    Comprar agora
                  </Button>
                ))}
                <Button variant={variant} disabled>
                  Desabilitado
                </Button>
                <Button variant={variant}>
                  <SFSymbol name="bag" />
                  Com ícone
                </Button>
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <p className="type-caption text-ink/50">
              <code>asChild</code>: um link com cara de botão
            </p>
            <Button asChild className="self-start">
              <Link href="/">Ver produtos</Link>
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <p className="type-caption text-ink/50">
              Largura total, como na página do produto
            </p>
            <div className="grid w-[420px] grid-cols-2 gap-2.5">
              <Button>Comprar agora</Button>
              <Button variant="secondary">Adicionar ao carrinho</Button>
            </div>
          </div>
        </section>

        <section className="flex w-[420px] flex-col gap-8">
          <h2 className="type-title-3">Input</h2>

          <Example label="simples">
            <Input placeholder="Nome no cartão" />
          </Example>

          <Example label="com prefixo">
            <InputGroup>
              <InputGroupInput placeholder="Número do cartão" mask="card" />
              <InputGroupAddon>#</InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput placeholder="0,00" mask="price" />
              <InputGroupAddon>R$</InputGroupAddon>
            </InputGroup>
          </Example>

          <Example label="com ação">
            <InputGroup>
              <InputGroupInput placeholder="Seu CEP" mask="cep" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton>Calcular o frete</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Example>

          <Example label="com máscara (o modelo aparece no foco)">
            <InputGroup>
              <InputGroupInput placeholder="SKU" mask="sku" />
              <InputGroupAddon>#</InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupButton>Gerar</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Example>

          <Example label="erro (aria-invalid)">
            <InputGroup>
              <InputGroupInput
                placeholder="Data de validade"
                mask="expiry"
                aria-invalid
              />
            </InputGroup>
            <InputGroup>
              <InputGroupInput placeholder="CVV" mask="cvv" aria-invalid />
              <InputGroupAddon>#</InputGroupAddon>
              <InputGroupAddon align="inline-end" className="text-discount">
                * Campo obrigatório
              </InputGroupAddon>
            </InputGroup>
          </Example>

          <Example label="obrigatório">
            <InputGroup>
              <InputGroupInput placeholder="Modelo" required />
              <InputGroupRequired />
            </InputGroup>
          </Example>

          <Example label="desabilitado">
            <Input placeholder="Nome no cartão" disabled />
          </Example>

          <Example label='tone="dark"'>
            <div className="bg-ink p-6">
              <InputGroup tone="dark">
                <InputGroupInput placeholder="Código promocional" />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton>Aplicar</InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </Example>
        </section>

        <section className="flex w-[420px] flex-col gap-8">
          <h2 className="type-title-3">RadioGroup</h2>

          <Example label="SizeSelector (M marcado, G esgotado)">
            <SizeSelector sizes={sampleSizes} defaultValue="M" />
          </Example>

          <Example label="poucos tamanhos">
            <SizeSelector sizes={sampleSizes.slice(0, 3)} />
          </Example>

          <Example label="erro (nenhum tamanho escolhido)">
            <SizeSelector sizes={sampleSizes} invalid />
            <p className="type-caption text-discount">Escolha um tamanho</p>
          </Example>
        </section>
      </div>
    </main>
  );
};

export default ComponentsPage;
