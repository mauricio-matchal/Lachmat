// coloca-se a função que chama api em um arquivo separado do componente que a chama, chamado camada de acesso a dados (data access layer), para que o componente não fique poluído com código de acesso a api, e para que a função possa ser reutilizada em outros componentes

export type Product = {
  id: string;
  slug: string;
  colorName: string;
  colorHex: string;
  images: string[];
  price: number; // in cents
  promoPrice: number | null;
  pixPrice: number | null;
  line: {
    slug: string;
    name: string;
    category: { slug: string; name: string };
  };
};

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${process.env.API_URL}/products`, {
    next: { revalidate: 60 },
    // é o cache do Next. A primeira visita busca na API, e as visitas dos próximos 60 segundos recebem a mesma resposta guardada, sem chamar a API de novo. Depois de 60s, ele busca de novo em segundo plano. Isso se chama ISR (Incremental Static Regeneration)
  });

  if (!response.ok) {
    throw new Error(
      `Failed to load products: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
