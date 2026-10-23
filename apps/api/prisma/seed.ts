import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const academia = await prisma.category.upsert({
    where: { slug: "academia" },
    update: {},
    create: {
      name: "Academia",
      slug: "academia",
    },
  });

  const hyverse = await prisma.productLine.upsert({
    where: { slug: "camiseta-hyverse-dri-fit-masculina" },
    update: {},
    create: {
      slug: "camiseta-hyverse-dri-fit-masculina",
      name: "Camiseta Hyverse Dri-FIT Masculina",
      description: "Camiseta de treino leve, com tecido que seca rápido.",
      model: "Camiseta",
      gender: "MASCULINO",
      fabric: "POLIESTER",
      categoryId: academia.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "camiseta-hyverse-dri-fit-masculina-amarelo" },
    update: {},
    create: {
      slug: "camiseta-hyverse-dri-fit-masculina-amarelo",
      sku: "1000-0458",
      colorName: "Amarelo",
      colorHex: "#D4E021",
      images: [
        "/products/camiseta-hyverse-dri-fit-masculina-amarelo-frente.jpg",
        "/products/camiseta-hyverse-dri-fit-masculina-amarelo-detalhe.jpg",
        "/products/camiseta-hyverse-dri-fit-masculina-amarelo-corpo-inteiro.jpg",
        "/products/camiseta-hyverse-dri-fit-masculina-amarelo-costas.jpg",
      ],
      price: 27999, // R$ 279,99
      promoPrice: 16999, // R$ 169,99
      pixPrice: 16149, // R$ 161,49
      lineId: hyverse.id,
      sizes: {
        create: [
          { name: "P", stock: 5 },
          { name: "M", stock: 12 },
          { name: "G", stock: 0 },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "camiseta-hyverse-dri-fit-masculina-preto" },
    update: {},
    create: {
      slug: "camiseta-hyverse-dri-fit-masculina-preto",
      sku: "1000-0459",
      colorName: "Preto",
      colorHex: "#0A0A0B",
      images: [
        "/products/camiseta-hyverse-dri-fit-masculina-preto-frente.jpg",
        "/products/camiseta-hyverse-dri-fit-masculina-preto-detalhe.jpg",
        "/products/camiseta-hyverse-dri-fit-masculina-preto-corpo-inteiro.jpg",
        "/products/camiseta-hyverse-dri-fit-masculina-preto-costas.jpg",
      ],
      price: 28999, // R$ 289,99
      promoPrice: 17999, // R$ 179,99
      pixPrice: 17099, // R$ 170,99
      lineId: hyverse.id,
      sizes: {
        create: [
          { name: "P", stock: 8 },
          { name: "M", stock: 3 },
          { name: "G", stock: 10 },
          { name: "GG", stock: 4 },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
