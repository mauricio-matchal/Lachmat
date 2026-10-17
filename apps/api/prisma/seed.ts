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

  await prisma.product.upsert({
    where: { slug: "camiseta-hyverse-dri-fit-uv-masculina" },
    update: {},
    create: {
      slug: "camiseta-hyverse-dri-fit-uv-masculina",
      name: "Camiseta Hyverse Dri-FIT UV Masculina",
      description: "Camiseta de treino leve, com tecido que seca rápido.",
      sku: "1000-0458",
      model: "Camiseta",
      gender: "MASCULINO",
      fabric: "POLIESTER",
      price: 27999, // R$ 279,99
      promoPrice: 16999, // R$ 169,99
      pixPrice: 16149, // R$ 161,49
      categoryId: academia.id,
      variants: {
        create: [
          {
            name: "Amarelo",
            colorHex: "#D4E021",
            images: [
              "/products/camiseta-hyverse-dri-fit-uv-masculina-amarelo-1.jpg",
              "/products/camiseta-hyverse-dri-fit-uv-masculina-amarelo-2.jpg",
              "/products/camiseta-hyverse-dri-fit-uv-masculina-amarelo-3.jpg",
              "/products/camiseta-hyverse-dri-fit-uv-masculina-amarelo-4.jpg",
            ],
            sizes: {
              create: [
                { name: "P", stock: 5 },
                { name: "M", stock: 12 },
                { name: "G", stock: 0 },
              ],
            },
          },
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
