import { Injectable } from "@nestjs/common";
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
}
