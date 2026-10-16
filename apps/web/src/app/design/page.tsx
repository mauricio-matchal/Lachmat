import { LogoSymbol, LogoWordmark } from "@/components/brand/logo";

const textStyles = [
  { className: "type-title", label: "Title", sample: "Ofertas do dia" },
  { className: "type-title-2", label: "Title 2", sample: "Você também pode gostar" },
  { className: "type-title-3", label: "Title 3", sample: "R$ 161,49" },
  { className: "type-button", label: "Button", sample: "Editar detalhes" },
  { className: "type-subbutton", label: "Subbutton", sample: "Adicionar ao carrinho" },
  { className: "type-body", label: "Body", sample: "Camiseta Hyverse Dri-FIT Masculina" },
  { className: "type-subbody", label: "Subbody", sample: "Academia" },
  { className: "type-footnote", label: "Footnote", sample: "Lançamentos · Ofertas · Masculino" },
  { className: "type-subfootnote", label: "Subfootnote", sample: "Política de Privacidade" },
  { className: "type-caption", label: "Caption", sample: "Entregar para este endereço" },
];

const colors = [
  { className: "bg-lime", label: "lime" },
  { className: "bg-ink", label: "ink" },
  { className: "bg-surface", label: "surface" },
  { className: "bg-input", label: "input" },
  { className: "bg-muted-button", label: "muted-button" },
  { className: "bg-discount", label: "discount" },
  { className: "bg-success", label: "success" },
  { className: "bg-success-bg", label: "success-bg" },
];

export default function DesignPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12">
      <h1 className="type-title mb-10">Design system</h1>

      <section className="mb-12 flex flex-col gap-6">
        {textStyles.map((style) => (
          <div key={style.label}>
            <p className="type-caption text-ink/50">{style.label}</p>
            <p className={style.className}>{style.sample}</p>
          </div>
        ))}
      </section>

      <section className="mb-12 flex flex-wrap items-center gap-6">
        <LogoWordmark className="h-4 w-auto" />
        <LogoSymbol className="h-4 w-auto" />
        <div className="flex items-center gap-6 bg-ink p-4 text-lime">
          <LogoWordmark className="h-4 w-auto" />
          <LogoSymbol className="h-4 w-auto" />
        </div>
      </section>

      <section className="flex flex-wrap gap-4">
        {colors.map((color) => (
          <div key={color.label} className="flex flex-col gap-2">
            <div className={`${color.className} size-20 border border-ink/10`} />
            <p className="type-caption text-center">{color.label}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
