# Lachmat

> **"Viva o sentimento."** — e-commerce full-stack de uma marca fictícia de moda esportiva premium, sediada em Salvador – BA.

![Status](https://img.shields.io/badge/status-planejamento-lightgrey) ![Idioma](https://img.shields.io/badge/UI-pt--BR-A9DE0D) ![Moeda](https://img.shields.io/badge/moeda-BRL-0A0A0B)

Lachmat é um projeto de portfólio: a implementação fiel de um design do Figma, com fluxos reais de ponta a ponta (navegar → carrinho → checkout → pedido) e uma área administrativa para gestão de produtos. O objetivo é demonstrar cuidado com o front-end, domínio full-stack e um código limpo e fácil de explicar.

> 🚧 **Em desenvolvimento.** O projeto está na fase de planejamento. Link da demo, capturas de tela e credenciais de demonstração serão adicionados no lançamento.

---

## Funcionalidades

### Loja

- **Home** — banner principal com vídeo, ofertas relâmpago com contagem regressiva, banner de campanha sazonal, carrossel de mais vendidos e grade de lançamentos
- **Busca e catálogo** — busca tolerante a acentos e erros de digitação, com filtros (cor, tamanho, categoria, preço, gênero e tecido), ordenação e paginação, tudo refletido na URL (compartilhável e compatível com o botão voltar)
- **Páginas de categoria** — Lançamentos, Ofertas, Masculino, Feminino, Academia, Corrida, Skateboarding e Casual
- **Página de produto** — galeria de imagens, variações de cor, seletor de tamanho com estoque, cálculo de frete por CEP, preço no Pix e parcelado, recomendações
- **Carrinho** — controle de quantidade, cupom promocional e totais; salvo no navegador
- **Checkout** (sem cadastro) — endereço com preenchimento automático por CEP, pagamento simulado com cartão (pré-visualização ao vivo, parcelamento) ou Pix (QR code com expiração)
- **Confirmação do pedido** e **Acompanhar pedido** (por e-mail e número do pedido)

### Administração ("Gestão")

- Grade de produtos com filtros e ordenação
- Criação e edição de produtos: upload de 4 imagens, preços com desconto calculado automaticamente, categoria, gênero, modelo, gerador de SKU, variações de cor, tamanhos e estoque
- Exclusão lógica (_soft delete_) com confirmação

### Em todo o app

- Responsivo (desenhado em 393px no mobile e 1440px no desktop)
- Acessível: HTML semântico, navegação por teclado, _focus trap_ em modais, feedback com `aria-live`
- SEO: renderização no servidor para páginas de produto e categoria, Open Graph, JSON-LD de `Product` e sitemap
- Textos da interface em **português (pt-BR)** e preços em **reais** (`R$ 1.799,99`)

---

## Design system

Visual editorial, com cantos retos (**border-radius 0** em todos os elementos), tipografia display larga e pesada e um verde-limão marcante como cor da marca.

| Token              | Hex       | Uso                                                            |
| ------------------ | --------- | -------------------------------------------------------------- |
| `brand-lime`       | `#A9DE0D` | Cor da marca, CTAs principais, destaques                       |
| `brand-black`      | `#0A0A0B` | Barra de navegação, botões principais, barras de filtro, texto |
| `surface`          | `#F1F1F1` | Cards de produto, rodapé, linhas do carrinho                   |
| `input-bg`         | `#E6E6E6` | Campos de formulário                                           |
| `button-secondary` | `#DADADA` | Ações secundárias                                              |
| `discount-red`     | `#F33321` | Selos de `% OFF`, erros de validação                           |
| `success`          | `#34C759` | Estado de sucesso do carrinho                                  |

Componentes reutilizáveis: Header (5 estados), menu de categorias, menu mobile, rodapé com letreiro animado, ProductCard (4 variações), LaunchTile, Carrossel, Contagem regressiva, Modal, ConfirmDialog, Toast, Paginação, CreditCardPreview e primitivos de formulário.

---

## Regras de negócio

Todos os valores do mockup foram conferidos com estas regras, e cada uma delas terá teste unitário.

- **Dinheiro em centavos inteiros**, formatado apenas na renderização com `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`
- **Percentual de desconto** = `floor((1 − precoVenda / precoLista) × 100)` (arredondado para baixo)
- **Parcelamento** em até 3x sem juros; a última parcela absorve os centavos do arredondamento
- **Total** = subtotal − cupom + frete
- **Estoque** validado ao adicionar ao carrinho, revalidado no checkout e decrementado de forma atômica ao finalizar o pedido
- **Pedidos guardam uma cópia** (snapshot) de nomes, preços e endereço, então o histórico permanece correto mesmo que o produto mude depois
- **SKU** no formato `NNNN-NNNN`, único e gerado automaticamente
- **Frete simulado** por região do CEP, com frete grátis acima de um valor mínimo

---

## Rotas

| Rota                      | Página                 | Acesso         |
| ------------------------- | ---------------------- | -------------- |
| `/`                       | Home                   | público        |
| `/search?q=…`             | Resultados da busca    | público        |
| `/category/:slug`         | Listagem por categoria | público        |
| `/:slug/p?color=…`        | Detalhes do produto    | público        |
| `/cart`                   | Carrinho               | público        |
| `/checkout`               | Checkout               | público        |
| `/orders/:number/success` | Pedido concluído       | dono do pedido |
| `/orders`                 | Acompanhar pedido      | público        |
| `/admin`                  | Gestão de produtos     | admin          |

---

## Modelo de dados

```
Order ── OrderItem          (dados do cliente e endereço no próprio pedido)
User                        (só administradores)

Category ── Product ── ProductVariant (cor + imagens) ── VariantSize (tamanho + estoque)

PromoCode · FlashDeal · Campaign
```

Exclusão lógica de produtos, SKU único e área de administração protegida no servidor.

---

## Stack

**Front-end:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui

**Back-end:** NestJS, Prisma, PostgreSQL

**Testes:** Vitest, Testcontainers, Playwright

**Infra:** Docker, GitHub Actions, Vercel, Neon

O projeto é um monorepo com o front (`apps/web`) e a API (`apps/api`) separados. As decisões de arquitetura estão em [`docs/decisions/`](docs/decisions/).

---

## Qualidade

- **Performance:** imagens otimizadas (WebP/AVIF, _lazy loading_), skeletons de carregamento, meta de Lighthouse ≥ 90 na home e na página de produto
- **Segurança:** senhas com hash, proteção da área admin no servidor, validação de entrada e de uploads, _rate limit_ na autenticação, dados de cartão nunca armazenados, segredos em variáveis de ambiente
- **Testes:** unitários para as regras de negócio, integração para a API e E2E para o fluxo de compra e o CRUD da administração
- **DX:** script de seed com catálogo realista (40+ produtos), `.env.example` e setup local com um único comando

---

## Roadmap

- [ ] **Fase 0 — Setup:** definição da stack e ADRs, lint, formatação, CI e deploy de preview
- [ ] **Fase 1 — Fundação do design system:** tokens, logos em SVG, primitivos e página de vitrine de componentes
- [ ] **Fase 2 — Layout e componentes compostos:** header, navegação, rodapé, cards, carrosséis, contagem regressiva e banners
- [ ] **Fase 3 — Dados e API:** schema, migrations, seed, listagem com filtros e busca, testes das regras de negócio
- [ ] **Fase 4 — Navegação na loja:** home, busca, categorias, página de produto, skeletons e 404
- [ ] **Fase 5 — Carrinho:** persistência, cupom promocional e estado vazio
- [ ] **Fase 6 — Checkout:** endereço com CEP, pagamento, criação do pedido e acompanhamento do pedido
- [ ] **Fase 7 — Administração:** login do admin, grade de produtos, criação e edição com upload, exclusão lógica
- [ ] **Fase 8 — Polimento:** versões mobile, animações, acessibilidade, performance e SEO
- [ ] **Fase 9 — Lançamento:** deploy em produção, dados de demonstração, capturas de tela e vídeo de apresentação

---

## Como rodar localmente

_Será documentado quando a stack for definida._

---

## Aviso

Lachmat é uma marca fictícia criada para fins de portfólio. As imagens e os nomes de produtos usados na versão publicada serão livres de direitos ou criados especialmente para o projeto.
