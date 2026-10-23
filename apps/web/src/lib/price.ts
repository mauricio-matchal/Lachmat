// funções que manejam preços, como formatar para moeda brasileira, calcular desconto, etc.

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

// usar /** */ faz com que quando voce passa o mouse o uso apareça na função, e tambem aparece na documentação do projeto chama-se jsdoc.

/** 16999 -> R$ 169,99 */
export function formatPrice(price: number): string {
  return brl.format(price / 100);
}

/** 16999, 14999 -> 12. Or 12% */
export function calculateDiscountPercentage(
  originalPrice: number,
  discountedPrice: number,
): number {
  if (originalPrice <= 0) {
    throw new Error("Original price must be greater than zero.");
  }

  // Rounded down, as in the Figma (29.57% → 29%): never advertise more than the real discount
  return Math.floor(((originalPrice - discountedPrice) / originalPrice) * 100);
}
