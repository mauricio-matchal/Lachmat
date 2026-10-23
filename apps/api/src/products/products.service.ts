import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany({
      where: { deletedAt: null },
      include: {
        line: { include: { category: true } },
        sizes: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        sizes: true,
        line: {
          include: {
            category: true,
            products: {
              where: { deletedAt: null },
              select: {
                slug: true,
                colorName: true,
                colorHex: true,
                images: true,
              },
            },
          },
        },
      },
    });

    if (!product || product.deletedAt) {
      throw new NotFoundException(`Product "${slug}" not found`);
    }

    return product;
  }
}
