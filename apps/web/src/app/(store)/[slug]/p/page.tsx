import { getProductBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: PageProps<"/[slug]/p">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return <p>{product.line.name}</p>;
}
