/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `fabric` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `ratingAvg` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `ratingCount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `Size` table. All the data in the column will be lost.
  - You are about to drop the `Variant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productId,name]` on the table `Size` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `colorHex` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorName` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lineId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_variantId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_productId_fkey";

-- DropIndex
DROP INDEX "Product_categoryId_idx";

-- DropIndex
DROP INDEX "Size_variantId_name_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId",
DROP COLUMN "description",
DROP COLUMN "fabric",
DROP COLUMN "gender",
DROP COLUMN "model",
DROP COLUMN "name",
DROP COLUMN "ratingAvg",
DROP COLUMN "ratingCount",
ADD COLUMN     "colorHex" TEXT NOT NULL,
ADD COLUMN     "colorName" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "lineId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Size" DROP COLUMN "variantId",
ADD COLUMN     "productId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Variant";

-- CreateTable
CREATE TABLE "ProductLine" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "fabric" "Fabric" NOT NULL,
    "ratingAvg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductLine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductLine_slug_key" ON "ProductLine"("slug");

-- CreateIndex
CREATE INDEX "ProductLine_categoryId_idx" ON "ProductLine"("categoryId");

-- CreateIndex
CREATE INDEX "Product_lineId_idx" ON "Product"("lineId");

-- CreateIndex
CREATE UNIQUE INDEX "Size_productId_name_key" ON "Size"("productId", "name");

-- AddForeignKey
ALTER TABLE "ProductLine" ADD CONSTRAINT "ProductLine_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES "ProductLine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
