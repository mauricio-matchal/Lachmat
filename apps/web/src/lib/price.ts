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

const decimal = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2 });

/** Mask for price inputs, keeps only digits and reads them as cents: "abc1234" -> "12,34", "123456" -> "1.234,56" */
export const maskPrice = (value: string): string => {
  // leading zeros dropped, so erasing "0,01" empties the field (and the placeholder comes back)
  // instead of getting stuck on a black "0,00"; 9 digits = up to R$ 9.999.999,99
  const digits = value.replace(/\D/g, "").replace(/^0+/, "").slice(0, 9);
  if (!digits) return "";
  return decimal.format(Number(digits) / 100);
};

/** Back to cents for the API: "1.234,56" -> 123456 */
export const parsePrice = (masked: string): number =>
  Number(masked.replace(/\D/g, ""));

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
